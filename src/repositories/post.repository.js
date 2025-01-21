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
//게시글 생성
export const createPost = async (conn, postData) => {
    const query = `
        INSERT INTO post (
            user_id, category_id, title, body, image, thumbnail,
            status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'active', NOW())
    `;
    
    const params = [
        postData.userId,
        postData.categoryId,
        postData.title,
        postData.body,
        postData.image || null,
        postData.thumbnail || null
    ];

    const [result] = await conn.query(query, params);
    return result.insertId;
};
// 게시글 수정
export const updatePost = async (conn, postData) => {
    const query = `
        UPDATE post 
        SET title = ?,
            body = ?,
            category_id = ?,
            image = ?,
            thumbnail = ?,
            updated_at = NOW()
        WHERE id = ? AND user_id = ?
    `;
    
    const params = [
        postData.title,
        postData.body,
        postData.categoryId,
        postData.image || null,
        postData.thumbnail || null,
        postData.postId,
        postData.userId
    ];

    const [result] = await conn.query(query, params);
    if (result.affectedRows === 0) {
        throw new Error('게시글을 찾을 수 없거나 수정 권한이 없습니다.');
    }
    return true;
};

//게시글 조회 
export const getPostById = async (conn, postId) => {
    const [posts] = await conn.query(
        'SELECT id, title, body, created_at, updated_at FROM post WHERE id = ?',
        [postId]
    );
    return posts[0];
};
//방문한 글의 좋아요를 사용자가 눌렀는지 판별별
export const checkPostLiked = async (conn, userId, postId) => {
    const [likes] = await conn.query(
        'SELECT id FROM liked_post WHERE user_id = ? AND post_id = ? AND status = true',
        [userId, postId]
    );
    return likes.length > 0;
};