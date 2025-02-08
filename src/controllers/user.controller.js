import { StatusCodes } from "http-status-codes";
import {userToHistory, userToProfile, historyModifyDTO, historyCreateDTO, userToInfo} from "../dtos/user.dto.js";
import {
  userHistory,
  userProfileModify,
  userHistoryModify,
  userHistoryCreate,
  showUserInfo
} from "../services/user.service.js";


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
  const user = await userProfileModify(userToProfile(req.user, req.file))
  res.status(StatusCodes.OK).success(user)
}

//연혁 수정 
export const handlerPatchUserHistory = async (req, res) => {
   /* 
   #swagger.summary = '연혁 수정 API'
   #swagger.tags = ['User']
   #swagger.description = '사용자의 연혁 정보(제목, 내용)를 수정합니다.'

   #swagger.security = [{
       "bearerAuth": []
   }]

   #swagger.requestBody = {
       required: true,
       content: {
           "application/json": {
               schema: {
                   type: "object",
                   properties: {
                       title: {
                           type: "string",
                           example: "학력 및 전공"
                       },
                       body: {
                           type: "string",
                           example: "XX대학교 컴퓨터공학과 졸업"
                       }
                   }
               }
           }
       }
   }

   #swagger.responses[200] = {
       description: "연혁 수정 성공",
       content: {
           "application/json": {
               schema: {
                   type: "object",
                   properties: {
                       resultType: { type: "string", example: "SUCCESS" },
                       error: { type: "null", example: null },
                       success: {
                           type: "object",
                           properties: {
                               userId: { type: "number", example: 1 },
                               title: { type: "string", example: "학력 및 전공" },
                               body: { type: "string", example: "XX대학교 컴퓨터공학과 졸업" },
                               updatedAt: { type: "string", example: "2024-02-05T12:00:00.000Z" }
                           }
                       }
                   }
               }
           }
       }
   }

   #swagger.responses[400] = {
       description: "연혁 수정 실패",
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
                               data: { type: "object", example: {} }
                           }
                       },
                       success: { type: "null", example: null }
                   }
               }
           }
       }
   }

   #swagger.responses[500] = {
       description: "연혁 수정 실패 (내부 서버 오류)",
       content: {
           "application/json": {
               schema: {
                   type: "object",
                   properties: {
                       resultType: { type: "string", example: "FAIL" },
                       error: {
                           type: "object",
                           properties: {
                               errorCode: { type: "string", example: "U041" },
                               reason: { type: "string", example: "연혁 수정에 실패했습니다." },
                               data: { type: "object", example: {} }
                           }
                       },
                       success: { type: "null", example: null }
                   }
               }
           }
       }
   }
   */
  const history = await userHistoryModify(historyModifyDTO({
    userId: req.user.userId,
    title: req.body.title,
    body: req.body.body
  }));
  res.status(StatusCodes.OK).success(history);
};

//연혁 생성
export const handlerCreateUserHistory = async (req, res) => {
  const history = await userHistoryCreate(historyCreateDTO(req.user,req.body));
  res.status(StatusCodes.OK).success(history);
  /*
    #swagger.summary = '사용자 연혁 생성 API'
    #swagger.tags = ['User']

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: { type: "string", example: "학력/전공" },
              body: { type: "string", example: "가천대학교 컴퓨터공학과 졸업" }
            },
            required: ["userId", "title", "body"]
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: "사용자 연혁 생성 성공 응답",
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
                  title: { type: "string", example: "학력 및 전공" },
                  body: { type: "string", example: "어쩌고 저쩌고" }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: "사용자 연혁 생성 실패 응답",
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

// 사용자 정보 조회
export const handlerShowUserInfo = async (req, res) => {
  const user = await showUserInfo(userToInfo(req.user));
  res.status(StatusCodes.OK).success(user);
  /*
    #swagger.summary = '마이페이지 사용자 정보 조회 API'
    #swagger.tags = ['User']

    #swagger.responses[200] = {
      description: "마이페이지 사용자 정보 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "null", example: null },
              name: { type: "string", example: "유궁둔" },
              introduction: { type: "string", example: "내가 궁둔이다" },
              photo: { type: "string", example: "profile.jpg" },
              history: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    title: { type: "string", example: "학력" },
                    body: { type: "string", example: "XX대학교 컴퓨터공학과 졸업" },
                  }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: "잘못된 요청 (유효하지 않은 사용자 ID)",
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
                      userId: { type: "integer", example: 1 }
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