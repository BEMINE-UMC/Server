import {StatusCodes} from "http-status-codes";
import {userForEmail, userToHistory, userToProfile} from "../dtos/user.dto.js";
import {userEmailGet, userHistory, userProfileModify} from "../services/user.service.js";


// 연혁 조회 요청
export const handlerGetUserHistory = async (req, res) => {
    console.log("연혁 조회 요청");
    const history = await userHistory(userToHistory(req.user));

    res.status(StatusCodes.OK).success(history);
    /*
  #swagger.summary = '사용자 연혁 조회 API'
  #swagger.tags = ['User']

  #swagger.security = [{
    "bearerAuth": []
  }]

  #swagger.responses[200] = {
    description: "사용자 연혁 조회 성공 응답",
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
                userId: { type: "number", example: 1 },
                history: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      num: { type: "number", example: 1 },
                      title: { type: "string", example: "학력 및 전공" },
                      body: { type: "string", example: "어쩌고 저쩌고" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  #swagger.responses[400] = {
    description: "사용자 연혁 조회 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U001" },
                reason: { type: "string", example: "존재하지 않는 유저입니다." },
                data: {
                  type: "object",
                  properties: {
                    userId: { type: "number", example: 1 }
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

}


// 나의 프로필 사진 수정하기
export const handlerPatchMyProfile = async (req, res) => {
    /*
      #swagger.summary = '사용자 프로필 사진 수정 API';
      #swagger.tags = ['User']

      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                photo: {
                  type: "string",
                  format: "binary",
                  description: "업로드할 프로필 사진 파일"
                }
              },
              required: ["photo"]
            }
          }
        }
      }

      #swagger.responses[200] = {
        description: "사용자 프로필 사진 수정 성공 응답",
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
                    userId: { type: "number", example: 1 },
                    photoUrl: { type: "string", example: "프로필 사진 url" }
                  }
                }
              }
            }
          }
        }
      };

      #swagger.responses[400] = {
        description: "사용자 프로필 사진 수정 실패 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "U001" },
                    reason: { type: "string", example: "존재하지 않는 사용자입니다." },
                    data: {
                      type: "object",
                      properties: {
                        userId: { type: "number", example: 1 },
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
    const user = await userProfileModify(userToProfile(req.user,req.file))
    res.status(StatusCodes.OK).success(user)
}

//사용자 이메일 찾기 요청
export const handlerGetUserEmail = async (req,res) => {
/*
  #swagger.summary = '사용자 이메일 찾기 API';
  #swagger.tags = ['User']

  #swagger.requestBody = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          name: { type: "string", example: "usernmae"},
          password: { type: "string", example: "password1234" }
        },
        required: ["name", "password"]
      }
    }
  }
};

  #swagger.responses[200] = {
    description: "사용자 이메일 찾기 성공 응답",
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
                id: { type: "number", example: 1 },
                name: { type: "string", example: "username" },
                email: { type: "string", example: "user@example.com" }
              }
            }
          }
        }
      }
    }
  };

  #swagger.responses[400] = {
    description: "사용자 이메일 찾기 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U030" },
                reason: { type: "string", example: "해당 정보의 이메일이 존재하지 않습니다." },
                data: {
                  type: "object",
                  properties: {
                    username: { type: "string", example: "username"},
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

const userEmail = await userEmailGet(userForEmail(req.body));
  res.status(StatusCodes.OK).success(userEmail);
}