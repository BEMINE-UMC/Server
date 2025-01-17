import { prisma } from "../db.config.js";
import { pool } from "../db.config.js";
import { NonExistUserError } from "../errors/post.error.js";

//게시물 좋아요 칼럼 생성
export const createUserPostLike = async (userId, postId) => {
    try {
        const existPostLike = await prisma.likedPost.findFirst({
            where: {
                postId: parseInt(postId),
                userId: parseInt(userId),
            },
        });

        if (existPostLike)
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
    } catch (error) {
        console.error("Error in createUserPostLike: ", error);
        throw error;
    }

};

//사용자가 작성한 다른 게시물 조회
export const getUserOtherPost = async (userId) => {
    const conn = await pool.getConnection();

    try {
        // 사용자가 존재하는지 먼저 확인
        const [user] = await pool.query(`SELECT * FROM user WHERE id = ?;`, [userId]);

        if (user.length === 0) {
            throw new NonExistUserError("존재하지 않는 사용자입니다.", { requestedUserId: userId });
          }

        const [posts] = await pool.query(`SELECT * FROM post WHERE user_id = ?;`, [userId]);

        console.log(posts);

        return posts;
    } catch (error) {
        console.error("Error in getUserOtherPost: ", error);
        throw error;
    }
};