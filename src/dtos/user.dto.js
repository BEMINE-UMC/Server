

// 연혁 조회 요청 DTO
import {NotFileAllowedError} from "../errors/user.error.js";
import {deleteImage} from "../../middleware.js";

export const userToHistory = (user) =>{
    return{
        userId: parseInt(user.userId)
    }
}

// 연혁 조회 전송 DTO
export const responseFromHistory = (data) =>{
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
export const historyModifyDTO = (data) => ({
    userId: parseInt(data.userId),
    title: data.title,
    body: data.body,
    updatedAt: data.updated_at
});