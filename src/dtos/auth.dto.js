import { EmailFormError, CodeFormError } from "../errors/auth.error.js";

export const createdPostUserInfoDTO = (data) => {
  return {
    userId: data.id,
    name: data.name,
    created_at: data.created_at
  }
};

export const createdGetLoginInfoDTO = (data, accessToken, refreshToken) => {
  return {
    created_at: data.created_at,
    accessToken,
    refreshToken
  }
};

export const createdGetRefreshTokenDTO = (refreshToken) => {
  return {
    accessToken: refreshToken
  }
};

export const createdSendEmailDTO = (email) => {
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw new EmailFormError("이메일은 '@'를 포함하는 문자열이어야 합니다.", { email });
  }

  return { 
    email
  };
};

export const createdVerifyEmailDTO = (email, code) => {
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw new EmailFormError("이메일은 '@'를 포함하는 문자열이어야 합니다.", { email });
  }

  if (!code || typeof code !== 'string' || code.length !== 6) {
    throw new CodeFormError("인증번호는 6자리 숫자입니다.", { code });
  }

  return { 
    email,
    code
  };
};

export const createdNewPasswordDTO = (data) => {
  return {
    userId: data.id
  }
};

//사용자 이메일 찾기 요청 DTP
export const userForEmail = (body) => {
  return{
      name: body.name,
      password: body.password
  }
};
//사용자 이메일 찾기 응답 DTO
export const responseFromUserEmail = (data) => {
  return{
      id: data.id,
      name: data.name,
      email: data.email
  }
};

export const createdUserDataDTO = (data) => {
  return {
    userId: data.id
  }
};

export const createdNicknameDTO = (data) => {
  return {
    name: data.name
  }
};
