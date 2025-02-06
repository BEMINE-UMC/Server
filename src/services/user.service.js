import { getUserHistory, getUserInfo, patchUserProfile , updateUserHistory} from "../repositories/user.repository.js";
import {responseFromHistory, responseFromPatchUserProfile} from "../dtos/user.dto.js";
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

export const userHistoryModify = async (data) => {
        // 사용자 존재 여부 확인
        const user = await getUserInfo(data);
        if (!user) {
            throw new NotExsistsUserError("존재하지 않는 사용자입니다.", data);
        }
        
        // 연혁 정보 업데이트
        const updated = await updateUserHistory(data);
        if (!updated) {
            throw new UpdateHistoryError("연혁 수정에 실패했습니다.");
        }
        
        return data;
};