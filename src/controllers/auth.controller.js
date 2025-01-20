import bcrypt from 'bcrypt';
import { StatusCodes } from "http-status-codes";
import { postUserInfo } from "../services/auth.service.js";
import { getLoginInfo } from "../services/auth.service.js";
import { handleTokenRefreshService } from "../services/auth.service.js";
import { PasswordLengthError } from "../errors/auth.error.js";
import { createdGetLoginInfoDTO } from '../dtos/auth.dto.js';

// 회원가입
export const handleSignUp = async (req, res) => {
  /*
            #swagger.summary = '회원가입 API';
            #swagger.tags = ['Post']
  
            #swagger.responses[200] = {
              description: "회원가입 성공 응답",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      resultType: { type: "string", example: "SUCCESS" },
                      error: { type: "object", nullable: true, example: null },
                      success: {
                        type: "object",
                        properties: {
                          accessToken: { type: "string", example: "accessToken" },
                          refreshToken: { type: "string", example: "refreshToken" }
                        }
                      }
                    }
                  }
                }
              }
            };
      */

  console.log("회원가입 요청");

  const { name, email, password } = req.body;

  // 비밀번호 길이 검증
  if (password.length < 4 || password.length > 15) {
    throw new PasswordLengthError("비밀번호는 4자 이상이거나 15자 이하여야 합니다.");
  }

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  const userInfo = await postUserInfo({ name, email, password: hashedPassword });

  res.status(StatusCodes.OK).success(userInfo);

}

// 로그인
export const handleLogin = async (req, res) => {

  /*
  #swagger.summary = '로그인 API';
  #swagger.tags = ['Post']
  
  #swagger.responses[200] = {
    description: "로그인 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                accessToken: { type: "string", example: "accessToken" },
                refreshToken: { type: "string", example: "refreshToken" }
              }
            }
          }
        }
      }
    }
  }

  #swagger.responses[400] = {
    description: "로그인 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "L001" },
                reason: { type: "string", example: "로그인 실패" },
                data: { type: "object", nullable: true, example: {} }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }
*/

  console.log("로그인 요청");

  const { email, password } = req.body;

  const userInfo = await getLoginInfo({email, password});

  res.status(StatusCodes.OK).success(userInfo);

}

// Access Token 재발급
export const handleTokenRefresh = async (req, res) => {

  /*
  #swagger.summary = 'Access Token 재발급 API';
  #swagger.tags = ['Post']
  
  #swagger.responses[200] = {
    description: "Access Token 재발급 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                accessToken: { type: "string", example: "accessToken" },
                refreshToken: { type: "string", example: "refreshToken" }
              }
            }
          }
        }
      }
    }
  }

  #swagger.responses[400] = {
    description: "Access Token 재발급 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "L001" },
                reason: { type: "string", example: "로그인 실패" },
                data: { type: "object", nullable: true, example: {} }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }
*/

  console.log("Access Token 재발급 요청");

  const { refreshToken } = req.body;

  const newAccessToken = await handleTokenRefreshService(refreshToken);

  res.status(StatusCodes.OK).success(newAccessToken);

}

// 이메일 인증
export const handlecheckEmail = async (req, res) => {

  /*
  #swagger.summary = '이메일 인증 API';
  #swagger.tags = ['Get']

  #swagger.responses[200] = {
    description: "이메일 인증 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                email: { type: "string", example: "user@example.com" },
                accessToken: { type: "string", example: "accessToken" },
                refreshToken: { type: "string", example: "refreshToken" }
              }
            }
          }
        }
      }
    }
  }

  #swagger.responses[400] = {
    description: "이메일 인증 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "L003" },
                reason: { type: "string", example: "이메일 인증 실패" },
                data: { type: "object", nullable: true, example: {} }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }
*/


}