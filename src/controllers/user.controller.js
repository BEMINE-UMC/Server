import {StatusCodes} from "http-status-codes";
import {userToHistory} from "../dtos/user.dto.js";
import {userHistory} from "../services/user.service.js";


// 연혁 조회 요청
export const handlerGetUserHistory = async (req, res) => {
    console.log("연혁 조회 요청");

    const history = await userHistory(userToHistory(req.params));

    res.status(StatusCodes.OK).success(history);
    /*
  #swagger.summary = '사용자 히스토리 조회 API';
  #swagger.tags = ['Get']
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '유저 ID',
    required: true,
    type: 'integer'
  }

  #swagger.responses[200] = {
    description: "사용자 히스토리 조회 성공 응답",
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
                  },
                 example: [
                  { num: 1, title: "학력 및 전공", body: "전공: 미디어커뮤니케이션 학과... " },
                  { num: 2, title: "주요 경험", body: "인턴십: 스타트업 A사 6개월일함..." },
                  { num: 3, title: "기타 활동", body: "개인프로젝트: 커피브랜드 C사..." },
                  { num: 4, title: "주요 역할 및 성과", body: "마케팅 툴: Google Analytics, Facebook Ads Manger..." }
                ]
                }
              }
            }
          }
        }
      }
    }
  };

  #swagger.responses[400] = {
    description: "사용자 히스토리 조회 실패 응답",
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
  };
*/

}


// 나의 프로필 사진 수정하기
export const handlerPatchMyProfile = async (req, res) => {
    /*
      #swagger.summary = '사용자 프로필 사진 수정 API';
      #swagger.tags = ['Patch']
      #swagger.parameters['userId'] = {
        in: 'path',
        description: '사용자 ID',
        required: true,
        type: 'integer',
      }

      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                photoUrl: {
                  type: "string",
                  format: "binary",
                  description: "업로드할 프로필 사진 파일"
                }
              },
              required: ["photoUrl"]
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
                    errorCode: { type: "string", example: "P003" },
                    reason: { type: "string", example: "이미지 파일을 올려주세요" },
                    data: {
                      type: "object",
                      properties: {
                        userId: { type: "number", example: 1 },
                        photoUrl: { type: "string", example: "url" }
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

}