import {prisma} from "../db.config.js";


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