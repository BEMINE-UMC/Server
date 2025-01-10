import { StatusCodes } from "http-status-codes";
import { createUserLike } from "../services/post.service.js";

export const handlerPostLikeCreate = async (req, res, next) => {
    console.log("게시물 좋아요 누르기 요청");
    
    const likedPost = await createUserLike(req.params.userId,req.params.postId);

    res.status(StatusCodes.OK).success(likedPost);
 /* 
    #swagger.summary = '게시물 좋아요 API'
    #swagger.tags = ['Post']
    #swagger.description = '게시물 좋아요 누르는 API입니다.'
    
    #swagger.responses[200] = {
        description: "게시물 좋아요 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "SUCCESS" },
                        error: { type: "null", example: null },
                        success: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: { type: "integer", example: 1 },
                                    postId: { type: "integer", example: 1 },
                                    userId: { type: "integer", example: 1 },
                                    createdAt: { type: "string", format: "date-time", example: "2025-01-10T12:00:00Z" },
                                    updatedAt: { type: "string", format: "date-time", example: "2025-01-10T12:00:00Z" },
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    #swagger.responses[400] = {
        description: "이미 좋아요 누른 상태임",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "P001" },
                                reason: { type: "string", example: "User already liked this post" },
                                data: { 
                                    type: "object",
                                    example: {}
                                }
                            }
                        },
                        success: { type: "null", example: null }
                    }
                }
            }
        }
    }
    */
};

// 최근 본 게시물 조회
export const handlerGetRecentPost = async (req, res) => {
    /*
      #swagger.summary = '최근 게시물 조회 API';
      #swagger.tags = ['Post']
      #swagger.parameters['userId'] = {
        in: 'path',
        description: '유저 ID',
        required: true,
        type: 'integer',
      }

      #swagger.responses[200] = {
        description: "사용자 최근 게시물 조회 성공 응답",
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
                    post: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          postId: { type: "number", example: 1 },
                          url: { type: "string", example: "링크주소" }
                        }
                      },
                      example:[
                        { postId: 1, url: "example1.png"},
                        { postId: 2, url: "example2.png"}
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
        description: "사용자 최근 게시물 조회 실패 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "P001" },
                    reason: { type: "string", example: "해당 유저가 최근 본 게시물이 없습니다." },
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

// 스크랩한 게시물 조회
export const handlerGetScrapPost = async (req, res) => {
    /*
  #swagger.summary = '북마크 게시물 조회 API';
  #swagger.tags = ['Post']
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '유저 ID',
    required: true,
    type: 'integer',
  }

  #swagger.responses[200] = {
    description: "사용자 북마크 게시물 조회 성공 응답",
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
                post: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      postId: { type: "number", example: 1 },
                      url: { type: "string", example: "링크주소" }
                    }
                  },
                  example:[
                    { postId: 1, url: "example1.png"},
                    { postId: 2, url: "example2.png"}
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
    description: "사용자 북마크 게시물 조회 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "P002" },
                reason: { type: "string", example: "해당 유저가 스크랩한 게시물이 없습니다." },
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
