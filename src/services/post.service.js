import { createdPostLikedDTO, createdPostScrapedDTO } from "../dtos/post.dto.js";
import { createdGetOtherPostDTO } from "../dtos/post.dto.js";
import { alreadyExistPostLike, alreadyExistPostScrap, NonExistUserError } from "../errors/post.error.js";
import { createUserPostLike, createUserPostScrap } from "../repositories/post.repository.js";
import { getUserOtherPost } from "../repositories/post.repository.js";

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

     if (userOtherPosts === null || userOtherPosts.length === 0) {
        throw new NonExistUserError("존재하지 않는 사용자입니다.", { requestedUserId: userId });
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