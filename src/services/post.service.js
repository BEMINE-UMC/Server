import {
    createdPostLikedDTO,
    createdPostScrapedDTO,
    responseFromRecentPost,
    responseFromScrapPost,
    responseFromSearchedPost
} from "../dtos/post.dto.js";
import { createdGetOtherPostDTO } from "../dtos/post.dto.js";
import {
    alreadyExistPostLike,
    alreadyExistPostScrap,
    NonExistUserError,
    NotFoundSearchedPost,
    NotRecentPostsErrors, NotScrapPostsErrors ,  ContentRequiredError ,TitleRequiredError , InvalidImageFormatError
} from "../errors/post.error.js";

import {createUserPostLike, createUserPostScrap, getRecentPosts, getSearchPosts , findPostForDelete , updatePostStatus} from "../repositories/post.repository.js";
import { getUserOtherPost , createPost , updatePost} from "../repositories/post.repository.js";
import {getUserInfo} from "../repositories/user.repository.js";
import { pool } from "../db.config.js";
import { imageUploader , deleteImage } from "../../middleware.js";
import {NotExsistsUserError} from "../errors/user.error.js";
import { pool } from "../db.config.js";
import { deleteImage } from "../../middleware.js";




//사용자 게시물 좋아요 누르기
export const createUserLike = async (userId, postId) => {
    const userlikedPost = await createUserPostLike(userId,postId);
  
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
    const userScrapedPost = await createUserPostScrap(userId,postId);
  
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
export const RecentViewPosts = async(data) =>{
    const recentPosts = await getRecentPosts(data.userId);
    const userId = data.userId

    const confirm = await getUserInfo(data);

    // 존재하는 사용자인지 검사
    if(confirm === null)
        throw new NotExsistsUserError("유저가 존재하지 않음", data.userId)


    const posts = recentPosts.map(item=>({
        postId: item.post.id,
        url:item.post.thumbnail
    }))

    return responseFromRecentPost(userId, posts);
}

//게시물 검색하기
export const getSearchedPostsList = async(word) => {
    const listPost = await getSearchPosts(word);
    
    if(listPost.length==0)
        throw new NotFoundSearchedPost('검색된 게시물이 없습니다.', data)

    return responseFromSearchedPost(listPost);
}

// 스크랩한 게시물 조회
export const ScrapPosts = async (data) =>{
    const scrapPosts = await getScrapPosts(data);
    const userId = data.userId

    const confirm = await getUserInfo(data);

    // 존재하는 사용자인지 검사
    if(confirm === null)
        throw new NotExsistsUserError("유저가 존재하지 않음", data.userId)

    const posts = scrapPosts.map(item=>({
        postId: item.post.id,
        url:item.post.thumbnail
    }))

    return responseFromScrapPost(userId, posts);
}

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

//게시글 작성/수정 
export const createOrUpdatePost = async (postData) => {
    // 필수 입력값 검증
    if (!postData.title?.trim()) {
        throw new TitleRequiredError();
    }
    if (!postData.body?.trim()) {
        throw new ContentRequiredError();
    }
};

//게시글 삭제 로직
export const deletePost = async (userId, postId) => {
    // 삭제 로직 구현
};
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

try {
    // 게시글 삭제 로직
    const deletePost = async (conn, userId, postId) => {
        // 1. 게시글 존재 여부와 작성자 권한 확인
        const post = await findPostForDelete(conn, postId);
        if (!post) {
            throw new PostNotFoundError();
        }
        if (post.user_id !== userId) {
            throw new NotPostAuthorError();
        }

        // 2. S3에 저장된 이미지가 있다면 삭제 시도
        if (post.image) {
            try {
                new URL(post.image); // URL 유효성 검사
                await deleteImage(post.image);
            } catch (error) {
                console.error('이미지 삭제 실패:', error);
                // 이미지 삭제 실패가 전체 프로세스를 중단시키지는 않습니다
            }
        }

        // 3. 게시글 상태를 비활성화로 변경
        await updatePostStatus(conn, postId);
    };

    // 게시글 생성/수정 로직
    const createOrUpdatePost = async (conn, postData) => {
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
    };
} catch (error) {
    // 에러 처리는 상위 레벨에서 수행
    throw error;
}
        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};