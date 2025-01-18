import { createdPostUserInfoDTO } from "../dtos/auth.dto.js";
import { postUserInformation } from "../repositories/auth.repository.js";

// 회원가입 api
export const postUserInfo = async ({ name, email, password }) => {
    const userInfo = await postUserInformation({ name, email, password });

     return createdPostUserInfoDTO(userInfo);

};
