import {
    createdPostLikedDTO,
    createdPostScrapedDTO,
    responseFromRecentPost,
    responseFromScrapPost,
    responseFromSearchedPost
} from "../dtos/post.dto.js";
import { createdGetOtherPostDTO, responseFromAllPosts, responseFromAllPostsLoggedIn } from "../dtos/post.dto.js";
import {
    alreadyExistPostLike,
    alreadyExistPostScrap,
    NonExistUserError,
    NotFoundSearchedPost,
    NotRecentPostsErrors, NotScrapPostsErrors, 
    InvalidCategoryIdError, 
    InvalidOffsetError, 
    InvalidLimitError,
    NonexistentCategoryIdError
} from "../errors/post.error.js";
import {createUserPostLike, createUserPostScrap, getRecentPosts, getSearchPosts} from "../repositories/post.repository.js";
import { getUserOtherPost, getAllPostsInfo, getAllPostsInfoLoggedIn } from "../repositories/post.repository.js";
import {getUserInfo} from "../repositories/user.repository.js";
import {NotExsistsUserError} from "../errors/user.error.js";

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

// 게시물 전체 조회
export const allPostsInfoLoad = async (data) => {
    if (data.categoryId === undefined) {}
    else if (isNaN(data.categoryId) || data.categoryId <= 0) {
        throw new InvalidCategoryIdError("유효하지 않은 categoryId 입니다.", data.categoryId);
    }
    if (data.offset === undefined) {}
    else if (isNaN(data.offset) || data.offset < 0) {
        throw new InvalidOffsetError("유효하지 않은 offset 입니다.", data.offset);
    }
    if (data.limit === undefined) {}
    else if (isNaN(data.limit) || data.limit <= 0) {
        throw new InvalidLimitError("유효하지 않은 limit 입니다.", data.limit);
    }

    const allPostsInfo = await getAllPostsInfo(data.categoryId, data.offset, data.limit);
    if (allPostsInfo === null){
        throw new NonexistentCategoryIdError("존재하지 않는 categoryId 입니다.", data.categoryId);
    }

    return responseFromAllPosts(allPostsInfo);
}

// 게시물 전체 조회
export const allPostsInfoLoadLoggedIn = async (data) => {
    if (data.categoryId === undefined) {}
    else if (isNaN(data.categoryId) || data.categoryId <= 0) {
        throw new InvalidCategoryIdError("유효하지 않은 categoryId 입니다.", { requestedcategoryId : data.categoryId} );
    }
    if (data.offset === undefined) {}
    else if (isNaN(data.offset) || data.offset < 0) {
        throw new InvalidOffsetError("유효하지 않은 offset 입니다.", data.offset);
    }
    if (data.limit === undefined) {}
    else if (isNaN(data.limit) || data.limit <= 0) {
        throw new InvalidLimitError("유효하지 않은 limit 입니다.", data.limit);
    }

    const allPostsInfo = await getAllPostsInfoLoggedIn(data.userId, data.categoryId, data.offset, data.limit);
    if (allPostsInfo === null){
        throw new NonexistentCategoryIdError("존재하지 않는 categoryId 입니다.", data.categoryId);
    }

    return responseFromAllPostsLoggedIn(allPostsInfo);
}