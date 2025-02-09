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

export const updateUserHistory = async (data) => {
    // 데이터베이스 연결을 획득합니다
    const conn = await pool.getConnection();
    
    try {
        // 연혁 정보를 업데이트하는 쿼리를 실행합니다
        const query = `
            UPDATE user_history 
            SET title = ?, 
                body = ?, 
                updated_at = NOW()
            WHERE user_id = ?
        `;
        
        // 쿼리를 실행하고 결과를 확인합니다
        const [result] = await conn.query(query, [
            data.title, 
            data.body, 
            data.userId
        ]);
        
        // 업데이트된 행이 있는지 확인하여 반환합니다
        return result.affectedRows > 0;
    } finally {
        // 데이터베이스 연결을 반드시 해제합니다
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