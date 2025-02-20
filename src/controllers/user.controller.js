import { StatusCodes } from "http-status-codes";
import {
  userToHistory,
  userToProfile,
  historyCreateDTO,
  userToInfo,
  responseHistoryDTO,
  userToIntroduction
} from "../dtos/user.dto.js";
import {
  userHistory,
  userProfileModify,
  userHistoryModify,
  userHistoryCreate,
  showUserInfo, userIntroductionModify
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
//연혁수정 
export const handlerPatchUserHistory = async (req, res) => {
  /* 
  #swagger.summary = '연혁 및 자기소개 수정 API'
  #swagger.tags = ['User']
  #swagger.description = '사용자의 자기소개와 4개의 연혁 정보를 수정합니다.'

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
                        introduction: {
                            type: "string",
                            example: "멋진 콘텐츠 마케터가 되고싶은"
                        },
                        histories: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    body: { type: "string" }
                                }
                            },
                            example: [
                                {
                                    title: "학력 및 전공",
                                    body: "XX대학교 컴퓨터공학과 졸업"
                                },
                                {
                                    title: "주요 경험",
                                    body: "디지털 마케팅 에이전시 근무"
                                },
                                {
                                    title: "기타 활동",
                                    body: "콘텐츠 크리에이터 활동"
                                },
                                {
                                    title: "수상 실적",
                                    body: "마케팅 공모전 대상"
                                }
                            ]
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
                                introduction: { type: "string", example: "멋진 콘텐츠 마케터가 되고싶은" },
                                histories: {
                                    type: "array",
                                     items: {
                                    type: "object",
                                    properties: {
                                        title: { type: "string" },
                                        body: { type: "string" },
                                        updated_at: { type: "string", format: "date-time", example: "2024-02-07T12:00:00.000Z" }
                                    }
                                },
                                    example: [
                                        {
                                            title: "학력 및 전공",
                                            body: "한국대학교 컴퓨터공학과 졸업",
                                            updated_at: "2024-02-07T12:00:00.000Z"
                                        },
                                        {
                                            title: "주요 경험",
                                            body: "디지털 마케팅 에이전시 근무",
                                            updated_at: "2024-02-07T12:00:00.000Z"
                                        },
                                        {
                                            title: "기타 활동",
                                            body: "콘텐츠 크리에이터 활동",
                                            updated_at: "2024-02-07T12:00:00.000Z"
                                        },
                                        {
                                            title: "수상 실적",
                                            body: "마케팅 공모전 대상",
                                            updated_at: "2024-02-07T12:00:00.000Z"
                                        }
                                    ]
                                }
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
        description: "연혁 수정 실패 (서버 오류)",
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
  const data = responseHistoryDTO({
    userId: req.user.userId,
    introduction: req.body.introduction,
    histories: req.body.histories
  });

  // 서비스 계층 호출 
  const history = await userHistoryModify(data);
  res.status(StatusCodes.OK).success(history);
};

//연혁 생성
export const handlerCreateUserHistory = async (req, res) => {
  const history = await userHistoryCreate(historyCreateDTO(req.user, req.body));
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
              introduction: {type: "string", example: "안녕 나를소개하지" },
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
                  introduction: {type: "string", example: "안녕 나를소개하지" },
                  historyId: { type: "number", example: 1 },
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

// 자기소개 수정
export const handlerModifyIntroduction = async (req,res) =>{
  const user = await userIntroductionModify(userToIntroduction(req.user, req.body));
  res.status(StatusCodes.OK).success(user);
  /*
    #swagger.summary = '마이페이지 자기소개 수정 API'
    #swagger.tags = ['User']

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
              introduction: { type: "string", example: " 안녕하소." }
            },
            required: ["introduction"]
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: "자기소개 수정 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "null", example: null },
              userId: { type: "integer", example: 1 },
              introduction: { type: "string", example: "안녕하소" }
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