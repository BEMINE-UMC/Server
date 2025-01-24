import {
    createdPostLikedDTO,
    createdPostScrapedDTO,
    responseFromRecentPost,
    responseFromScrapPost,
    responseFromSearchedPost
} from "../dtos/post.dto.js";
import { createdGetOtherPostDTO, createPostDetailDTO } from "../dtos/post.dto.js";
import {
    alreadyExistPostLike,
    alreadyExistPostScrap,
    NonExistUserError,
    NotFoundSearchedPost,

    NotRecentPostsErrors, NotScrapPostsErrors, ContentRequiredError, TitleRequiredError, InvalidImageFormatError
} from "../errors/post.error.js";

import { createUserPostLike, createUserPostScrap, getRecentPosts, getSearchPosts, findPostForDelete, updatePostStatus, getScrapPosts,getPostById,checkPostLiked } from "../repositories/post.repository.js";
import { getUserOtherPost, createPost, updatePost } from "../repositories/post.repository.js";
import { getUserInfo } from "../repositories/user.repository.js";
import { pool } from "../db.config.js";
import { NotExsistsUserError } from "../errors/user.error.js";
import { imageUploader, deleteImage } from "../../middleware.js";





//사용자 게시물 좋아요 누르기
export const createUserLike = async (userId, postId) => {
    const userlikedPost = await createUserPostLike(userId, postId);

    if (!userlikedPost) {
        throw new alreadyExistPostLike(
            "User already liked this post",
            {
                userId: userId,
                PostId: postId,
            }
        );
    }

    return createdPostLikedDTO(userlikedPost);

};

//사용자가 작성한 다른 게시물 조회
export const getOtherPost = async (userId) => {
    const userOtherPosts = await getUserOtherPost(userId);

    // 게시물이 3개 초과 시, 첫 3개만 조회
    if (userOtherPosts.length > 3) {
        userOtherPosts.splice(3); // 첫 3개만 유지
    }

    return userOtherPosts.map(createdGetOtherPostDTO);
};

//사용자 게시물 스크랩 누르기
export const createUserScrap = async (userId, postId) => {
    const userScrapedPost = await createUserPostScrap(userId, postId);

    if (!userScrapedPost) {
        throw new alreadyExistPostScrap(
            "User already scraped this post",
            {
                userId: userId,
                PostId: postId,
            }
        );
    }

    return createdPostScrapedDTO(userScrapedPost);
};


// 최근 본 게시물 조회
export const RecentViewPosts = async (data) => {
    const recentPosts = await getRecentPosts(data.userId);
    const userId = data.userId

    const confirm = await getUserInfo(data);

    // 존재하는 사용자인지 검사
    if (confirm === null)
        throw new NotExsistsUserError("유저가 존재하지 않음", data.userId)


    const posts = recentPosts.map(item => ({
        postId: item.post.id,
        url: item.post.thumbnail
    }))

    return responseFromRecentPost(userId, posts);
}

//게시물 검색하기
export const getSearchedPostsList = async (word) => {
    const listPost = await getSearchPosts(word);

    if (listPost.length == 0)
        throw new NotFoundSearchedPost('검색된 게시물이 없습니다.', word)

    return responseFromSearchedPost(listPost);
}

// 스크랩한 게시물 조회
export const ScrapPosts = async (data) => {
    const scrapPosts = await getScrapPosts(data);
    const userId = data.userId

    const confirm = await getUserInfo(data);

    // 존재하는 사용자인지 검사
    if (confirm === null)
        throw new NotExsistsUserError("유저가 존재하지 않음", data.userId)

    const posts = scrapPosts.map(item => ({
        postId: item.post.id,
        url: item.post.thumbnail
    }))

    return responseFromScrapPost(userId, posts);
}
// 게시글 정보 (좋아요 여부 포함) 전달
export const getPostDetailWithLikeStatus = async (userId, postId) => {
    const conn = await pool.getConnection();
    try {
        const post = await getPostById(conn, postId,userId);
        if (!post) {
            throw new PostNotFoundError();

        }

        const isLiked = await checkPostLiked(conn, userId, postId);
        return createPostDetailDTO(post, isLiked);
    } finally {
        conn.release();
    }
};

//이미지 URL 검증 함수
const validateS3ImageUrl = async (imageUrl) => {
    if (!imageUrl.startsWith(`https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        return false;
    }
    try {
        // S3에 실제로 파일이 존재하는지 확인하는 로직
        const key = new URL(imageUrl).pathname.substring(1);
        await s3.headObject({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key
        }).promise();
        return true;
    } catch (error) {
        return false;
    }
};


export const deletePost = async (userId, postId) => {

    const conn = await pool.getConnection();

    try {
        // 트랜잭션 시작 - 데이터 일관성을 보장하기 위함
        await conn.beginTransaction();

        // 게시글 정보 조회 및 권한 검증
        const post = await findPostForDelete(conn, postId);
        if (!post) {
            throw new PostNotFoundError();
        }
        if (post.user_id !== userId) {
            throw new NotPostAuthorError();
        }

        // S3에 저장된 이미지가 있는 경우 삭제 처리
        if (post.image) {
            try {
                // URL 형식 검증 후 이미지 삭제 시도
                new URL(post.image);
                await deleteImage(post.image);
            } catch (error) {
                // 이미지 삭제 실패는 로그만 남기고 계속 진행
                // 고아 이미지가 될 수 있지만, 게시글 삭제는 진행
                console.error('이미지 삭제 실패:', error);
            }
        }

        // 게시글 상태를 비활성화로 변경 (소프트 삭제)
        const updated = await updatePostStatus(conn, postId);
        if (!updated) {
            throw new Error('게시글 상태 업데이트 실패');
        }

        // 모든 작업이 성공적으로 완료되면 트랜잭션 커밋
        await conn.commit();
    } catch (error) {
        // 에러 발생 시 트랜잭션 롤백
        await conn.rollback();
        throw error; // 상위 레벨에서 에러 처리할 수 있도록 다시 던짐
    } finally {
        // 데이터베이스 커넥션 반환
        conn.release();
    }
};

// 게시글 생성/수정 로직
export const createOrUpdatePost = async (postData) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction
    
    // 1. 본문에서 이미지 URL 추출
    let newImage = null;
    const imgMatch = postData.body.match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch) {
        newImage = imgMatch[1];
        // 이미지 URL 검증 - S3 버킷 규칙 준수 확인
        if (!await validateS3ImageUrl(newImage)) {
            throw new InvalidImageFormatError("유효하지 않은 이미지 URL입니다.");
        }
    }

    // 2. 기존 게시글 수정인 경우
    if (postData.postId) {
        // 기존 이미지 정보 조회 및 잠금 (동시성 제어)
        const [existingPost] = await conn.query(
            'SELECT image FROM post WHERE id = ? and user_id = ? FOR UPDATE',
            [postData.postId, postData.userId]
        );

        // 3. 이미지가 변경된 경우 이전 이미지 삭제
        const oldImage = existingPost[0]?.image;
        if (oldImage && oldImage !== newImage) {
            try {
                await deleteImage(oldImage);
            } catch (error) {
                throw new Error('기존 이미지 삭제 실패: ' + error.message);
            }
        }

        // 4. 게시글 업데이트
        await updatePost(conn, { ...postData, image: newImage });
    } else {
        // 5. 새 게시글 생성
        await createPost(conn, { ...postData, image: newImage });
    }
    await conn.commit();
} catch (error) {
    await conn.rollback();
    throw error;
} finally {
    conn.release();
}
}
