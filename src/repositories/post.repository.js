import { prisma } from "../db.config.js";
import { pool } from "../db.config.js";
import { NonexistPostError } from "../errors/post.error.js";

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
        {
            const updatePostLike = await prisma.likedPost.update({
                where: {
                    id: existPostLike.id,
                },
                data: {
                    status: !existPostLike.status,
                    updatedAt: new Date(),
                },
            });

            return updatePostLike;
        };

        const createPostLike = await prisma.likedPost.create({
            data: {
                userId: parseInt(userId),
                postId: parseInt(postId),
                createdAt: new Date(),
                updatedAt: new Date(),
                status: true,
            }
        });

        return createPostLike;
    } catch (error) {
        console.error("Error in createUserPostLike: ", error);
        throw error;
    }

};

//사용자가 작성한 다른 게시물 조회
export const getUserOtherPost = async (postId) => {
    const conn = await pool.getConnection();

    try {
        // postId에 해당하는 게시글의 userId 조회
        const [post] = await conn.query(`SELECT user_id FROM post WHERE id = ?;`, [postId]);

        if (post.length === 0) {
            throw new NonexistPostError("존재하지 않는 postId 입니다.", { postId: postId });
        }

        const userId = post[0].user_id;

        // 해당 사용자가 작성한 다른 게시글 조회 (현재 게시글 제외)
        const [posts] = await conn.query(`SELECT * FROM post WHERE user_id = ? AND id != ?;`, [userId, postId]);

        return posts;
    } catch (error) {
        console.error("Error in getUserOtherPost: ", error);
        throw error;
    } finally {
        conn.release(); // 커넥션 반환
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
        {
            const updatePostScrap = await prisma.scrapPost.update({
                where: {
                    id: existPostScrap.id,
                },
                data: {
                    status: !existPostScrap.status,
                    updatedAt: new Date(),
                },
            });

            return updatePostScrap;
        };

        const createPostScrap = await prisma.scrapPost.create({
            data: {
                userId: parseInt(userId),
                postId: parseInt(postId),
                createdAt: new Date(),
                updatedAt: new Date(),
                status: true,
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
    const posts = await prisma.user.findUnique({
        where:{id: userId},
        select:{
            id: true,
            recentViews:{
                take:16,
                orderBy:{createdAt: 'desc'},
                select:{
                    post:{
                        select:{
                            id:true,
                            userId: true,
                            thumbnail:true
                        }
                    }
                }
            }
        }
    })
    console.log(posts)
    console.log(posts.recentViews)
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
        include: {
            user: {
              select: {
                name: true, // user 테이블에서 username 가져오기
              },
            },
          },
    });

    return posts;
}

// 스크랩한 게시물 조회
export const getScrapPosts = async (data)=>{
    const posts = await prisma.user.findUnique({
        where:{id: data.userId},
        select:{
            id: true,
            scrapPosts:{
                where:{ status: true},
                take: 16,
                orderBy:{createdAt: 'desc'},
                select:{
                    post:{
                        select:{
                            id:true,
                            userId: true,
                            thumbnail:true
                        }
                    }
                }
            }
        }
    })
    return posts;
}
//삭제를 위해 받아오는 값 (작성자 확인 , s3에 이미지 삭제)
export const findPostForDelete = async (conn, postId) => {
    const [posts] = await conn.query(
        'SELECT user_id, image FROM post WHERE id = ?',
        [postId]
    );
    return posts[0];
};

// 게시물 상태를 비활성화로 변경 (소프트 삭제)
export const updatePostStatus = async (conn, postId) => {
    const [result] = await conn.query(
        'UPDATE post SET status = ?, inactive_date = NOW() WHERE id = ?',
        ['inactive', postId]
    );
    return result.affectedRows > 0;
};

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
//게시글 조회 ==== > #121 함수 추가 
export const getPostById = async (conn, postId,userId) => {
    await conn.beginTransaction();
    try {
    const [posts] = await conn.query(
        'SELECT id, title, body, created_at, updated_at FROM post WHERE id = ?',
        [postId]
    );
    await createRecentViewPost(conn , userId , postId); 
    await conn.commit();
    return posts[0];
} catch (error) {
    await conn.rollback();
    throw error;
}

};

//방문한 글의 좋아요를 사용자가 눌렀는지 판별별
export const checkPostLiked = async (conn, userId, postId) => {
    const [likes] = await conn.query(
        'SELECT id FROM liked_post WHERE user_id = ? AND post_id = ? AND status = true',
        [userId, postId]
    );
    return likes.length > 0;
};

//최근본 게시물 추가
export const createRecentViewPost = async (conn, userId, postId) => {
    // 기존에 조회한 기록이 있는지 확인
    const [rows] = await conn.query(
        'SELECT id FROM recent_view_post WHERE user_id = ? AND post_id = ?',
        [userId, postId]
    );

    if (rows.length > 0) {
        // 기존 기록이 있다면 created_at만 업데이트
        await conn.query(
            'UPDATE recent_view_post SET created_at = NOW() WHERE user_id = ? AND post_id = ?',
            [userId, postId]
        );
    } else {
        // 기존 기록이 없다면 새로운 레코드 삽입
        await conn.query(
            'INSERT INTO recent_view_post (user_id, post_id, created_at) VALUES (?, ?, NOW())',
            [userId, postId]
        );
    }
};

// 좋아요 누른 게시물 조회
export const getUserLikePost = async (data) => {
    const posts = await prisma.likedPost.findMany({
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
};

// 게시물 전체 조회 (정보 얻기-로그인 전)
export const getAllPostsInfo = async (categoryId, offset, limit) => {
    const conn = await pool.getConnection();
    try {
        let posts;

        // 기본 쿼리 정의
        const baseQuery = `
            SELECT 
                p.created_at AS post_created_at,
                p.id AS post_id,
                p.title,
                p.thumbnail,
                u.id AS author_id,
                u.name AS author_name,
                c.id AS category_id,
                c.name AS category_name,
                COUNT(CASE WHEN lp.status = true THEN 1 END) AS total_like_count
            FROM post AS p
            LEFT JOIN category AS c ON p.category_id = c.id
            LEFT JOIN user AS u ON p.user_id = u.id
            LEFT JOIN liked_post AS lp ON p.id = lp.post_id`;

        /* 공통 조건1: soft-delete된 상태면 목록 조회에서 제외 */
        // 카테고리가 명시되지 않은 경우
        if (categoryId === undefined) {
            [posts] = await conn.query(
                `${baseQuery}
                WHERE p.status = 'active' OR p.status = '활성'
                GROUP BY p.id
                ORDER BY p.created_at DESC
                LIMIT ? OFFSET ?`, 
                [limit, offset]
            );
        } else { // 카테고리가 명시된 경우
            const [categoryCheck] = await conn.query(
                `SELECT 1 FROM category WHERE id = ? LIMIT 1`,
                [categoryId]
            );
            if (categoryCheck.length === 0) {
                return null;
            }

            [posts] = await conn.query(
                `${baseQuery}
                WHERE (p.status = 'active' OR p.status = '활성') AND p.category_id = ?
                GROUP BY p.id
                ORDER BY p.created_at DESC
                LIMIT ? OFFSET ?`, 
                [categoryId, limit, offset]
            );
        }

        return posts;
    } catch (err) {
        throw new Error (
            `게시물 전체 조회 중에 오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
}

// 게시물 전체 조회 (정보 얻기-로그인 후)
export const getAllPostsInfoLoggedIn = async (userId, categoryId, offset, limit) => {
    const conn = await pool.getConnection();
    try {
        let posts;

        // liked_post 테이블에서 user_id === userId이고 status === true인 경우, status도 같이 조회되도록 하기

        // 기본 쿼리 정의
        const baseQuery = `
            SELECT 
                p.created_at AS post_created_at,
                p.id AS post_id,
                p.title,
                p.thumbnail,
                u.id AS author_id,
                u.name AS author_name,
                c.id AS category_id,
                c.name AS category_name,
                lp.status AS liked_status,
                sp.status AS scrap_status,
                COUNT(CASE WHEN lp_all.status = true THEN 1 END) AS total_like_count
            FROM post AS p
            LEFT JOIN category AS c ON p.category_id = c.id
            LEFT JOIN user AS u ON p.user_id = u.id
            LEFT JOIN liked_post AS lp ON p.id = lp.post_id AND lp.user_id = ? AND lp.status = true
            LEFT JOIN scrap_post AS sp ON p.id = sp.post_id AND sp.user_id = ? AND sp.status = true
            LEFT JOIN liked_post AS lp_all ON p.id = lp_all.post_id`;

        /* 공통 조건1: soft-delete된 상태면 목록 조회에서 제외 */
        // 카테고리가 명시되지 않은 경우
        if (categoryId === undefined) {
            [posts] = await conn.query(
                `${baseQuery}
                WHERE p.status = 'active' OR p.status = '활성'
                GROUP BY p.id, lp.status, sp.status
                ORDER BY p.created_at DESC
                LIMIT ? OFFSET ?`, 
                [userId, userId, limit, offset]
            );
        } else { // 카테고리가 명시된 경우
            const [categoryCheck] = await conn.query(
                `SELECT 1 FROM category WHERE id = ? LIMIT 1`,
                [categoryId]
            );
            if (categoryCheck.length === 0) {
                return null;
            }

            [posts] = await conn.query(
                `${baseQuery}
                WHERE (p.status = 'active' OR p.status = '활성') AND p.category_id = ?
                GROUP BY p.id, lp.status, sp.status
                ORDER BY p.created_at DESC
                LIMIT ? OFFSET ?`, 
                [userId, userId, categoryId, limit, offset]
            );
        }

        return posts;

    } catch (err) {
        throw new Error (
            `게시물 전체 조회 중에 오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
}

//사용자 자신이 작성한 게시물 조회
export const handleGetUserOwnPosts = async(userId) => {
    const posts = await prisma.post.findMany({
        where: {
          userId: userId,
          status: 'active'
        },
        include: {
          user: {
            select: {
              name: true, // user 테이블에서 username 가져오기
            },
          },
        },
      });

    return posts;
}