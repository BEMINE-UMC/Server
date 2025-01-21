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
#swagger.tags = ['Auth']

#swagger.requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          name: { type: "string", example: "username" },
          email: { type: "string", example: "user@example.com" },
          password: { type: "string", example: "password123" }
        },
        required: ["name", "email", "password"]
      }
    }
  }
};

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
              userId: { type: "integer", example: 1 },
              name: { type: "string", example: "username" },
              created_at: { type: "string", format: "date-time", example: "2024-01-30T16:23:24.271897" }
            }
          }
        }
      }
    }
  }
};

#swagger.responses[400] = {
  description: "회원가입 실패 응답 (비밀번호 유효성 검사 실패)",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "A010" },
              reason: { type: "string", example: "비밀번호는 4자 이상, 15자 이하여야 합니다." },
              data: { type: "object", nullable: true, example: null }
            }
          },
          success: { type: "object", nullable: true, example: null }
        }
      }
    }
  }
};

#swagger.responses[401] = {
  description: "회원가입 실패 응답 (닉네임 중복)",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "A011" },
              reason: { type: "string", example: "해당 닉네임은 이미 존재합니다." },
              data: {
                type: "object",
                properties: {
                  name: { type: "string", example: "username" }
                }
              }
            }
          },
          success: { type: "object", nullable: true, example: null }
        }
      }
    }
  }
};

#swagger.responses[402] = {
  description: "회원가입 실패 응답 (이메일 중복)",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "A012" },
              reason: { type: "string", example: "해당 이메일은 이미 존재합니다." },
              data: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@example.com" }
                }
              }
            }
          },
          success: { type: "object", nullable: true, example: null }
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
#swagger.tags = ['Auth']

#swagger.requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          email: { type: "string", example: "user@example.com" },
          password: { type: "string", example: "password123" }
        },
        required: ["email", "password"]
      }
    }
  }
};

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
              created_at: { type: "string", format: "date-time", example: "2024-01-30T16:23:24.271897" },
              accessToken: { type: "string", example: "accessToken" },
              refreshToken: { type: "string", example: "refreshToken" }
            }
          }
        }
      }
    }
  }
};

#swagger.responses[400] = {
  description: "로그인 실패 응답 (이메일 없음)",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "A013" },
              reason: { type: "string", example: "해당 이메일을 가진 사용자가 존재하지 않습니다." },
              data: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@example10.com" }
                }
              }
            }
          },
          success: { type: "object", nullable: true, example: null }
        }
      }
    }
  }
};

#swagger.responses[401] = {
  description: "로그인 실패 응답 (비밀번호 불일치)",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "A014" },
              reason: { type: "string", example: "비밀번호가 일치하지 않습니다." },
              data: { type: "object", nullable: true, example: null }
            }
          },
          success: { type: "object", nullable: true, example: null }
        }
      }
    }
  }
};
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
#swagger.tags = ['Auth']

#swagger.requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          refreshToken: { type: "string", example: "refreshToken" }
        },
        required: ["refreshToken"]
      }
    }
  }
};

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
              accessToken: { type: "string", example: "accessToken" }
            }
          }
        }
      }
    }
  }
};

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
              errorCode: { type: "string", example: "A015" },
              reason: { type: "string", example: "Refresh Token 값이 일치하지 않습니다." },
              data: { type: "object", nullable: true, example: null }
            }
          },
          success: { type: "object", nullable: true, example: null }
        }
      }
    }
  }
};
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
  #swagger.tags = ['Auth']

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