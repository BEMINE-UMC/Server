import bcrypt from 'bcrypt';
import { StatusCodes } from "http-status-codes";
import { postUserInfo, getLoginInfo, handleTokenRefreshService, sendVerificationEmail, verifyEmailCode, patchNewPassword } from "../services/auth.service.js";
import { PasswordLengthError, CodeNotValidateError } from "../errors/auth.error.js";

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

  const userInfo = await getLoginInfo({ email, password });

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

// 인증번호 발송
export const handlesendEmail = async (req, res) => {

  /*
    #swagger.summary = '인증번호 발송 API';
    #swagger.tags = ['Auth']
  
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string", example: "user@example.com" }
            },
            required: ["email"]
          }
        }
      }
    }
  
    #swagger.responses[200] = {
      description: "인증번호 발송 성공 응답",
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
                  message: { type: "string", example: "인증번호가 전송되었습니다!" }
                }
              }
            }
          }
        }
      }
    }
  
    #swagger.responses[400] = {
      description: "인증번호 발송 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "A018" },
                  reason: { type: "string", example: "이메일은 '@'를 포함하는 문자열이어야 합니다." },
                  data: {
                    type: "object",
                    properties: {
                      email: { type: "string", example: "user!example.com" }
                    }
                  }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */

  console.log("인증번호 발송 요청");

  const { email } = req.body;

  await sendVerificationEmail(email);

  res.status(StatusCodes.OK).success({ message: '인증번호가 전송되었습니다!' });

}

// 인증번호 검증
export const handlecheckEmail = async (req, res) => {

  /*
  #swagger.summary = '인증번호 검증 API';
  #swagger.tags = ['Auth']

  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: { type: "string", example: "user@example.com" },
            code: { type: "string", example: "123456" }
          },
          required: ["email", "code"]
        }
      }
    }
  }

  #swagger.responses[200] = {
    description: "인증번호 검증 성공 응답",
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
                message: { type: "string", example: "인증되었습니다." }
              }
            }
          }
        }
      }
    }
  }

  #swagger.responses[400] = {
    description: "인증번호 검증 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "A018" },
                reason: { type: "string", example: "이메일은 '@'를 포함하는 문자열이어야 합니다." },
                data: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "user!example.com" }
                  }
                }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }

  #swagger.responses[401] = {
    description: "인증번호 검증 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "A019" },
                reason: { type: "string", example: "인증번호는 6자리 숫자입니다." },
                data: {
                  type: "object",
                  properties: {
                    code: { type: "string", example: "1234567" }
                  }
                }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }

  #swagger.responses[402] = {
    description: "인증번호 검증 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "A020" },
                reason: { type: "string", example: "인증번호가 올바르지 않습니다." },
                data: { type: "object", example: {} }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }
*/

  console.log("인증번호 검증 요청");

  const { email, code } = req.body;

  const isVerified = await verifyEmailCode(email, code);

  if (isVerified) {
    return res.status(StatusCodes.OK).success({ message: '인증되었습니다.' });
  } else {
    throw new CodeNotValidateError("인증번호가 올바르지 않습니다.");
  }

}

// 비밀번호 재설정
export const handleNewPassword = async (req, res) => {

  console.log("비밀번호 재설정 요청");

  const { name, email, password } = req.body;

  const newPassword = await patchNewPassword(name, email, password);

  res.status(StatusCodes.OK).success({
    data: newPassword,
    message: '비밀번호가 변경되었습니다!',
  });

}
