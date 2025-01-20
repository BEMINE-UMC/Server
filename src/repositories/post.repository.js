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
        const [user] = await conn.query(`SELECT * FROM user WHERE id = ?;`, [userId]);

        if (user.length === 0) {
            throw new NonExistUserError("존재하지 않는 사용자입니다.", { requestedUserId: userId });
          }

        const [posts] = await conn.query(`SELECT * FROM post WHERE user_id = ?;`, [userId]);

        console.log(posts);

        return posts;
    } catch (error) {
        console.error("Error in getUserOtherPost: ", error);
        throw error;
    }
};

//게시물 스크랩 생성
export const createUserPostScrap = async (userId, postId) => {
    try {
        const existPostScrap = await prisma.scrapPost.findFirst({
            where: {
                postId: parseInt(postId),
                userId: parseInt(userId),
            },
        });

        if (existPostScrap)
            return null;

        const createPostScrap = await prisma.scrapPost.create({
            data: {
                userId: parseInt(userId),
                postId: parseInt(postId),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        return createPostScrap;

    } catch (error) {
        console.error("Error in createUserPostScrap: ", error);
        throw error;
    }

};

// 최근 본 게시물 테이블에서 게시물 ID 조회
export const getRecentPosts = async (userId)=>{
    const posts = await prisma.recentViewPost.findMany({
        where:{userId: userId},
        select:{
            post:{
                select:{
                    id: true,
                    thumbnail: true
                }
            }
        },
        orderBy:{
            createdAt: 'desc'
        },
        take: 16
    })
    return posts;
}

//게시물 제목 검색 조회
export const getSearchPosts = async  (words)=> {
    const posts = await prisma.post.findMany({
        where:{
            title:{
                contains: words
            },
        },
    });

    return posts;
}

// 스크랩한 게시물 조회
export const getScrapPosts = async (data)=>{
    const posts = await prisma.scrapPost.findMany({
        where:{userId: data.userId, status: true},
        select:{
            post:{
                select:{
                    id: true,
                    thumbnail: true
                }
            }
        },
        orderBy:{
            createdAt: 'desc'
        },
        take: 16
    })
    return posts;
}