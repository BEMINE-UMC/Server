import {prisma} from "../db.config.js";

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
