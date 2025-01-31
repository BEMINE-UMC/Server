import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { createdPostUserInfoDTO, createdGetLoginInfoDTO, createdGetRefreshTokenDTO, createdSendEmailDTO, createdVerifyEmailDTO, createdNewPasswordDTO, responseFromUserEmail } from "../dtos/auth.dto.js";
import { postUserInformation, getUserInfo, saveVerificationCode, getVerificationCode, patchNewPw, getUserEmail } from "../repositories/auth.repository.js";
import { NoCorrectUserEmail, NonExistRefreshError } from "../errors/auth.error.js";

dotenv.config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const EMAIL_TRANS_USER = process.env.EMAIL_TRANS_USER;
const EMAIL_TRANS_PW = process.env.EMAIL_TRANS_PW;
const EMAIL_TRANS_HOST = process.env.EMAIL_TRANS_HOST;

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

// 인증번호 발송 api
export const sendVerificationEmail = async (email) => {
    const { email: validatedEmail } = createdSendEmailDTO(email);
    console.log("Validated email: ", validatedEmail);

    // 인증번호 생성
    const code = crypto.randomInt(100000, 999999).toString();

    // 인증번호 저장
    await saveVerificationCode(validatedEmail, code);

    const transporter = nodemailer.createTransport({
        host: EMAIL_TRANS_HOST,
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_TRANS_USER,
            pass: EMAIL_TRANS_PW,
        },
    });

    const mailOptions = {
        from: EMAIL_TRANS_USER,
        to: validatedEmail,
        subject: 'Bemine Verification Code',
        text: `Your verification code is: ${code}`,
    };

    transporter.sendMail(mailOptions);
};

// 인증번호 검증 api
export const verifyEmailCode = async (email, code) => {
    const { email: validatedEmail, code: validatedCode } = createdVerifyEmailDTO(email, code);

    const savedCode = await getVerificationCode(validatedEmail);

    return savedCode === validatedCode;
};

// 비밀번호 재발급 api
export const patchNewPassword = async (name, email, password) => {
    const newPassword = await patchNewPw(name, email, password);

    return createdNewPasswordDTO(newPassword);
};

//사용자 이메일 찾기
export const userEmailGet = async (data) => {
    const userEmail = await getUserEmail(data);

    if(!userEmail)
    {
        throw new NoCorrectUserEmail("해당 정보의 이메일이 존재하지 않습니다.",data.name);
    }

    return responseFromUserEmail(userEmail);

};