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
    const history = await prisma.userHistory.findMany({
        where: {userId: data.userId},
        select:{
            num: true,
            title: true,
            body: true
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