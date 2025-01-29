import {prisma} from "../db.config.js";
import bcrypt from 'bcrypt';

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

// 사용자 이메일 조회
export const getUserEmail = async(data) => {
try{
    const user = await prisma.user.findFirst({
        where: {
            name: data.name
        }
    });

    //해당 이름을 가진 사용자가 없을 때
    if(user==null)
    {
        return null;
    }

    //사용자가 임력한 비밀번호가 일치하지 않을때
    const isCorrectPassword = await bcrypt.compare(data.password,user.password);
    if(!isCorrectPassword)
    {
        return null;
    }
    return user;
}catch(error){
    throw error;
}
}