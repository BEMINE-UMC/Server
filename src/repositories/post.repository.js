import { prisma } from "../db.config.js";

//게시물 좋아요 칼럼 생성
export const createUserPostLike = async(userId,postId) =>{
    try{
    const existPostLike = await prisma.likedPost.findFirst({
        where: {
          postId: parseInt(postId),
          userId: parseInt(userId),
        },
    });

    if(existPostLike)
        return null;

    const createPostLike = await prisma.likedPost.create({
        data: {
          userId: parseInt(userId),
          postId: parseInt(postId),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
    });

    return createPostLike;
    }catch (error) {
        console.error("Error in createUserPostLike: ", error);
        throw error;
    }
    
};