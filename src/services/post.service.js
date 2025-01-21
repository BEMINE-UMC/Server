import {
    createdPostLikedDTO,
    createdPostScrapedDTO,
    responseFromRecentPost,
    responseFromScrapPost,
    responseFromSearchedPost
} from "../dtos/post.dto.js";
import { createdGetOtherPostDTO , createPostDetailDTO } from "../dtos/post.dto.js";
import {
    alreadyExistPostLike,
    alreadyExistPostScrap,
    NonExistUserError,
    NotFoundSearchedPost,
    NotRecentPostsErrors, NotScrapPostsErrors , PostNotFoundError
} from "../errors/post.error.js";
import {createUserPostLike, createUserPostScrap, getRecentPosts, getSearchPosts , getPostById , checkPostLiked} from "../repositories/post.repository.js";
import { getUserOtherPost } from "../repositories/post.repository.js";
import {getUserInfo} from "../repositories/user.repository.js";
import {NotExsistsUserError} from "../errors/user.error.js";
import { pool } from "../db.config.js";
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
// 게시글 정보 (좋아요 여부 포함) 전달
export const getPostDetailWithLikeStatus = async (userId, postId) => {
    const conn = await pool.getConnection();
    try {
        const post = await getPostById(conn, postId);
        if (!post) {
            throw new PostNotFoundError();

        }

        const isLiked = await checkPostLiked(conn, userId, postId);
        return createPostDetailDTO(post, isLiked);
    } finally {
        conn.release();
    }
};