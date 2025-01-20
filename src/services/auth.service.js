import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createdPostUserInfoDTO, createdGetLoginInfoDTO, createdGetRefreshTokenDTO } from "../dtos/auth.dto.js";
import { postUserInformation, getUserInfo } from "../repositories/auth.repository.js";
import { NonExistRefreshError } from "../errors/auth.error.js";

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// 회원가입 api
export const postUserInfo = async ({ name, email, password }) => {
    const userInfo = await postUserInformation({ name, email, password });

    return createdPostUserInfoDTO(userInfo);

};

// 로그인 api
export const getLoginInfo = async ({ email, password }) => {

    const user = await getUserInfo({ email, password });

    const accessToken = jwt.sign(
        { userId: user.id, name: user.name, email: user.email },
        JWT_ACCESS_SECRET,
        { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
        { userId: user.id, name: user.name, email: user.email },
        JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    return createdGetLoginInfoDTO(user, accessToken, refreshToken);

};

// Access Token 재발급 api
export const handleTokenRefreshService = async (refreshToken) => {

    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return reject(new NonExistRefreshError("Refresh Token 값이 일치하지 않습니다."));
            }

            // 새로운 Access Token 발급
            const newAccessToken = jwt.sign(
                { userId: decoded.userId, name: decoded.name, email: decoded.email },
                JWT_ACCESS_SECRET,
                { expiresIn: '1h' }
            );
            resolve(createdGetRefreshTokenDTO(newAccessToken));
        });
    });
};