import { StatusCodes } from "http-status-codes";
import { postUserInfo } from "../services/auth.service.js";
import bcrypt from 'bcrypt';

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

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    const userInfo = await postUserInfo({ name, email, password: hashedPassword });

    res.status(StatusCodes.OK).success(userInfo);

}

// 로그인
export const handleLogin = async (req, res) => {

    /*
    #swagger.summary = '로그인 API';
    #swagger.tags = ['Get']
    
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