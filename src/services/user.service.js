import {getUserHistory, getUserInfo} from "../repositories/user.repository.js";
import {responseFromHistory } from "../dtos/user.dto.js";
import {NotExsistsUserError } from "../errors/user.error.js";


export const userHistory = async (userId) =>{

    const confirm = await getUserInfo(userId);
    // 존재하는 사용자인지 검사
    if(confirm === null)
        throw new NotExsistsUserError("존재하지 않는 사용자입니다.", userId)

    // 연혁 가져오기
    const history = await getUserHistory(userId)

    return responseFromHistory({userId, history});
}