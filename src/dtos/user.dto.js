

import {NotFileAllowedError} from "../errors/user.error.js";
import {deleteImage} from "../../middleware.js";

// 연혁 조회 요청 DTO
export const userToHistory = (user) =>{
    return{
        userId: parseInt(user.userId)
    }
}

// 연혁 조회 전송 DTO
export const responseFromHistory = (data) =>{
    console.log(data)
    return {
        userId: data.userId,
        history: data.history
    }
}

// 유저 프로필 수정 요청 DTO
export const userToProfile = (user, file) =>{
    // const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp", ".gif"];
    // const key = file.key
    // console.log(key)
    // const fileExtension = file.key.substring(file.key.lastIndexOf("."));
    //
    // if (!allowedExtensions.includes(fileExtension)) {
    //     const a = deleteImage(`https://bemine-s3.s3.ap-northeast-2.amazonaws.com/${file.key}`)
    //     throw new NotFileAllowedError('이미지 파일을 올려주세요', allowedExtensions)
    // }
    return{
        userId: parseInt(user.userId),
        photo: `https://bemine-s3.s3.ap-northeast-2.amazonaws.com/${file.key}`
    }
}

// 유저 프로필 수정 응답 DTO
export const responseFromPatchUserProfile = (data) =>{
    return{
        userId: data.id,
        photo: data.photo
    }
}

//연혁 수정 응답 DTO
export const responseHistoryDTO = (data) => ({
    userId: data.userId,
    introduction: data.introduction,
    histories: data.histories.map(history => ({
        title: history.title,
        body: history.body , 
        updatedAt : history.updated_at
    }))
});

// 연혁 생성 요청 DTO
export const historyCreateDTO = (user, body)=>{
    return{
        userId: parseInt(user.userId),
        introduction: body.introduction,
        title: body.title,
        body: body.body , 
        updatedAt : history.updated_at
    }
}

// 연혁 생성 전송 DTO
export const responseFromCreateHistory = (data) =>{
    return{
        userId: parseInt(data.history.userId),
        introduction: data.introduction,
        historyId: data.history.id,
        title: data.history.title,
        body: data.history.body,
        createAt: data.history.created_at
    }
}

// 마이페이지 사용자 정보 조회 요청 DTO 
export const userToInfo = (data) =>{
    return{
        userId: parseInt(data.userId)
    }
}

// 마이페이지 사용자 정보 조회 전송 DTO
export const responseFromAllUserInfo = (data) =>{
    return{
        name: data.name,
        introduction: data.introduction,
        photo: data.photo,
        history: data.userHistories
    }
}
