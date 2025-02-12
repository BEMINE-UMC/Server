import {prisma} from "../db.config.js";
import { pool } from "../db.config.js";
// 유저 정보 조회
export const getUserInfo = async (data) =>{
    const user = await prisma.user.findFirst({
        where: {id: data.userId}
    })

    return user;
}


// 연혁 조회하기
export const getUserHistory = async (data) => {
    const history = await prisma.user.findUnique({
        where: {id: data.userId},
        include: {
            userHistories:{
                select: {
                    title: true,
                    body: true
                }
            }
        }
    })
    return history;
}

// 유저 프로필 수정
export const patchUserProfile = async (data) => {
    const user = await prisma.user.update({
        where: {id: data.userId},
        data:{
            photo:data.photo
        },
        select:{
            id: true,
            photo: true
        }
    })

    return user;
}

//연혁수정 , 자기소개 수정
export const updateHistoryAndIntroduction = async (data) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        
        // 기존 함수 사용
        await updateUserIntroduction(data.userId, data.introduction);
        
        // 연혁 업데이트
        const [histories] = await conn.query(
            'SELECT id FROM user_history WHERE user_id = ? ORDER BY id ASC',
            [data.userId]
        );
        // 4개 다 update 할거
        for(let i = 0; i < data.histories.length; i++) {
            await conn.query(
                'UPDATE user_history SET title = ?, body = ? , updated_at = NOW() WHERE id = ? AND user_id = ?',
                [
                    data.histories[i].title,
                    data.histories[i].body,
                    histories[i].id,
                    data.userId
                ]
            );
        }
            // 업데이트된 데이터 조회
            const [updatedHistories] = await conn.query(
                'SELECT id, title, body, updated_at FROM user_history WHERE user_id = ? ORDER BY id ASC',
                [data.userId]
            );
        
        await conn.commit();
        return updatedHistories;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};


// 연혁 생성
export const createUserHistory = async (data) => {
    const history = await prisma.UserHistory.create({
        data:{
            userId: data.userId,
            title: data.title,
            body: data.body
        }
    })

    return history;
}


// 자기소개 업데이트
export const updateUserIntroduction = async (userId, introduction) => {
    const user = await prisma.user.update({
        where: {id: userId},
        data: {
            introduction: introduction
        }
    })
    
    return user;
}

// 마이페이지 사용자 정보 조회
export const getUserProfile =async(data) =>{
    const user = await prisma.user.findUnique({
        where: {id: data.userId},
        select:{
            name: true,
            introduction: true,
            photo: true,
            userHistories:{
                select:{
                    id: true,
                    title: true,
                    body: true,
                }
            }
        }
    });


    return user;
}

// 유저 프로필 사진 가져오기
export const getUserPhoto = async(data) =>{
    const userPhoto = await prisma.user.findUnique({
        where: {id: data.userId},
        select:{
            photo: true
        }
    })

    return userPhoto;
}

// 연혁 생성과 자기소개를 트랜잭션으로 묶어서 처리
export const historyCreateAndUserIntroduction = async (data) =>{
    const [history, user] = await prisma.$transaction([
        prisma.userHistory.create({
            data:{
                userId: data.userId,
                title: data.title,
                body: data.body
            },
            select:{
                id: true,
                userId: true,
                title: true,
                body: true
            }
        }),
        prisma.user.update({
            where:{id : data.userId},
            data:{introduction: data.introduction},
            select: {introduction: true}
        })
    ]);

    return {history,user}
}