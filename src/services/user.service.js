import {
    createUserHistory,
    getUserHistory,
    getUserInfo, getUserProfile,
    patchUserProfile,
     updateUserIntroduction,
     updateHistoryAndIntroduction
} from "../repositories/user.repository.js";
import {
    responseFromAllUserInfo,
    responseFromCreateHistory,
    responseFromHistory,
    responseFromPatchUserProfile,
    responseHistoryDTO
} from "../dtos/user.dto.js";
import { NotExsistsUserError , UpdateHistoryError} from "../errors/user.error.js";
import {deleteImage} from "../../middleware.js";

// 연혁 조회하기
export const userHistory = async (data) =>{
    const confirm = await getUserInfo(data);
    // 존재하는 사용자인지 검사
    if(confirm === null)
        throw new NotExsistsUserError("존재하지 않는 사용자입니다.", data)

    // 연혁 가져오기
    const history = await getUserHistory(data)
    const userId = data.userId
    return responseFromHistory({userId, history});
}

// 유저 프로필 수정하기
export const userProfileModify = async (data) => {
    const confirm = await getUserInfo(data);

    // 존재하는 사용자인지 검사
    if(confirm === null)
        throw new NotExsistsUserError("존재하지 않는 사용자입니다.", data.userId)

    // 이전 이미지의 URL을 받음
    const preProfile = confirm.photo

    // 이전 이미지가 존재할 경우 삭제
    if(preProfile){
        const responseDel = await deleteImage(preProfile)
    }

    const updateUser = await patchUserProfile(data)

    return responseFromPatchUserProfile(updateUser);
}

//연혁 수정
export const userHistoryModify = async (data) => {
    // 사용자 존재 여부 검증
    const user = await getUserInfo(data);
    if (!user) {
        throw new NotExsistsUserError("존재하지 않는 사용자입니다.", data);
    }

    // 비즈니스 로직 
    const result = await updateHistoryAndIntroduction(data);
    if (!result) {
        throw new UpdateHistoryError("연혁 수정에 실패했습니다.");
    }

    // 응답 데이터 생성 및 반환
    return {
        userId: data.userId,
        introduction: data.introduction,
        histories: result.map(history => ({
            title: history.title,
            body: history.body,
            updatedAt: history.updatedAt
        }))
    };
};

// 연혁 생성
export const userHistoryCreate = async (data) => {
    const confirm = await getUserInfo(data);
    if (!confirm){
        throw new NotExsistsUserError("존재하지 않는 사용자입니다.", {userId: data.userId})
    }

    const history = await createUserHistory(data);

    const user = await updateUserIntroduction(data.userId, data.introduction)
    const introduction = user.introduction;
    return responseFromCreateHistory({history,introduction});


}

// 사용자 정보 조회
export const showUserInfo =async (data)=>{
    const userProfile = await getUserProfile(data);
    if(!userProfile){
        throw new NotExsistsUserError("존재하지 않는 사용자입니다.", {userId: data.userId})
    }

    return responseFromAllUserInfo(userProfile);
}