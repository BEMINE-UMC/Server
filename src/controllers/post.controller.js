import { StatusCodes } from "http-status-codes";
import { createUserLike } from "../services/post.service.js";
import { getOtherPost } from "../services/post.service.js";

//게시물 좋아요 누르기
export const handlerPostLike = async (req, res, next) => {
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


// 사용자가 작성한 다른 게시물 불러오기
export const handleOtherPost = async (req, res, next) => {

    /*
     #swagger.summary = '사용자가 작성한 다른 게시물 조회 API';
     #swagger.tags = ['Get']
     #swagger.parameters['userId'] = {
       in: 'path',
       description: '유저 ID',
       required: true,
       type: 'integer',
     }
   
     #swagger.responses[200] = {
       description: "사용자가 작성한 다른 게시물 조회 성공 응답",
       content: {
         "application/json": {
           schema: {
             type: "object",
             properties: {
               resultType: { type: "string", example: "SUCCESS" },
               error: { type: "object", nullable: true, example: null },
               success: {
                 type: "array",
                 items: {
                   type: "object",
                   properties: {
                     userId: { type: "integer", example: 1 },
                     postId: { type: "integer", example: 1 },
                     title: { type: "string", example: "첫 번째 게시물" },
                     picture: { type: "string", example: "image1_url" }
                   }
                 },
                 example: [
                   { userId: 1, postId: 1, title: "첫 번째 게시물", picture: "image1_url" },
                   { userId: 1, postId: 2, title: "두 번째 게시물", picture: "image2_url" },
                   { userId: 1, postId: 3, title: "세 번째 게시물", picture: "image3_url" }
                 ]
               }
             }
           }
         }
       }
     };
   
     #swagger.responses[400] = {
       description: "사용자가 작성한 다른 게시물 조회 실패 응답",
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
                   reason: { type: "string", example: "존재하지 않는 사용자입니다." },
                   data: {
                     type: "object",
                     properties: {
                       requestedUserId: { type: "number", example: 1 }
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

   
       console.log("사용자가 작성한 다른 게시물 조회 요청");
       
       const otherPost = await getOtherPost(req.params.userId);
   
       res.status(StatusCodes.OK).success(otherPost);
   
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

// // 게시물 전체 조회 요청
export const handleViewAllPosts = async (req, res, next) => {
    /* 
    #swagger.summary = '게시물 전체 조회 API';
    #swagger.tags = ['Get']
    #swagger.description = '게시물 전체 조회를 하는 API입니다.'
    #swagger.responses[200] = {
        description: "게시물 전체 조회 성공 응답",
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
                                data: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            postId: { type: "number", example: 1 },
                                            userId: { type: "number", example: 1 },
                                            categoryId: { type: "number", example: 1 },
                                            title: { type: "string", example: "Post Title 1" },
                                            body: { type: "string", example: "Post Body 1" },
                                            picture: { type: "string", example: "https://example.com/pictures/pic1.jpg"},
                                            createdAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" },
                                            updatedAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" }
                                        }
                                    }
                                },
                                pagination: {
                                    type: "object", 
                                    properties: {
                                        cursor: { type: "number", nullable: true }
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
        description: "게시물 전체 조회 실패 응답",
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
                                reason: { type: "string", example: "유효하지 않은 categoryId 입니다." },
                                data: {
                                    type: "object",
                                    properties: {
                                        requestedCategoryId: { type: "number", example: 0 }
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
    try {
        
    } catch (error) {
        next(error);
    }
}

// 좋아요 누른 게시물 조회
export const handleGetPostLiked = async (req, res) => {
    
/*
      #swagger.summary = '좋아요 누른 게시물 조회 API';
      #swagger.tags = ['Get']

      #swagger.responses[200] = {
        description: "좋아요 누른 게시물 조회 성공 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "SUCCESS" },
                error: { type: "object", nullable: true, example: null },
                success: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      userId: { type: "number", example: 1 },
                      postId: { type: "number", example: 1 },
                      title: { type: "string", example: "첫 번째 게시물" },
                      picture: { type: "string", example: "image1_url" }
                    }
                  },
                  example: [
                    { userId: 1, postId: 1, title: "첫 번째 게시물", picture: "image1_url" },
                    { userId: 1, postId: 2, title: "두 번째 게시물", picture: "image2_url" }
                  ]
                }
              }
            }
          }
        }
      };

      #swagger.responses[400] = {
        description: "좋아요 누른 게시물 조회 실패 응답",
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
                    reason: { type: "string", example: "존재하지 않는 사용자입니다." },
                    data: {
                      type: "object",
                      properties: {
                        requestedUserId: { type: "number", example: 1 }
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

//포스트 스크랩 하기
export const handlerPostScrapt = async (req,res) => {
    /* 
    #swagger.summary = '게시물 스크랩 API'
    #swagger.tags = ['Post']
    #swagger.description = '게시물 스크랩 누르는 API입니다.'
    
    #swagger.responses[200] = {
        description: "게시물 스크랩 성공 응답",
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
        description: "이미 스크랩 누른 상태임",
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
                                reason: { type: "string", example: "User already scrapted this post" },
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
}

//게시물 검색하기
export const handlerPostSearch = async (req,res) => {
    /* 
    #swagger.summary = '게시물 검색 API';
    #swagger.tags = ['Get']
    #swagger.description = '게시물을 검색하는 API입니다.'
    #swagger.parameters['query'] = {
        in: 'query',
        required: true,
        description: '검색 키워드',
        schema: { type: 'string', example: 'Title' }
    }
    #swagger.responses[200] = {
        description: "게시물 검색 성공 응답",
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
                                data: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            postId: { type: "number", example: 1 },
                                            userId: { type: "number", example: 1 },
                                            categoryId: { type: "number", example: 1 },
                                            title: { type: "string", example: "Title" },
                                            body: { type: "string", example: "Body" },
                                            picture: { type: "string", example: "url"},
                                            createdAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" },
                                            updatedAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" }
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
        description: "게시물 검색 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "P005" },
                                reason: { type: "string", example: "검색어와 일치하는 게시물이 없습니다." },
                                data: {
                                    type: "object",
                                    properties: {
                                        searchWord: { type: "string", example: "Title" }
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