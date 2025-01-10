import { createdPostLikedDTO } from "../dtos/post.dto.js";
import { alreadyExistPostLike } from "../error.js";
import { createUserPostLike } from "../repositories/post.repository.js";

//사용자 게시물 좋아요 누르기
export const createUserLike = async (userId, postId) => {
    const userlikedPost = await createUserPostLike(userId,postId);
  
    if (!userlikedPost) {
        throw new alreadyExistPostLike(
            "User already liked this post",
            {
              userId: userId,
              existingPostId: postId,
            }
        );
    }

    return createdPostLikedDTO(userlikedPost);

};