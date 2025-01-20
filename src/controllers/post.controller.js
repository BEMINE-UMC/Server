import { StatusCodes } from "http-status-codes";
import {createUserLike, createUserScrap, getSearchedPostsList, RecentViewPosts, ScrapPosts} from "../services/post.service.js";
import { getOtherPost } from "../services/post.service.js";
import {postToRecent, postToScrap} from "../dtos/post.dto.js";

//게시물 좋아요 누르기
export const handlerPostLike = async (req, res, next) => {
    console.log("게시물 좋아요 누르기 요청");
    
    const likedPost = await createUserLike(req.user.userId,req.params.postId);

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
     #swagger.tags = ['POST']
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
                   errorCode: { type: "string", example: "P042" },
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
       
       const otherPost = await getOtherPost(req.user.userId);
   
       res.status(StatusCodes.OK).success(otherPost);
   
   };


// 최근 본 게시물 조회
export const handlerGetRecentPost = async (req, res) => {
    /*
      #swagger.summary = '최근 게시물 조회 API';
      #swagger.tags = ['POST']

      #swagger.responses[200] = {
        description: "사용자 최근 게시물 조회 성공 응답(값이 있을 때)",
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
      #swagger.responses[201] = {
        description: "사용자 최근 게시물 조회 성공 응답( 값이 없을 때)",
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
                      type: "array", example: []
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
                    errorCode: { type: "string", example: "U001" },
                    reason: { type: "string", example: "유저가 존재하지 않음" },
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
    const posts = await RecentViewPosts(postToRecent(req.user))
    res.status(StatusCodes.OK).success(posts)
}

// 스크랩한 게시물 조회
export const handlerGetScrapPost = async (req, res) => {
    /*
      #swagger.summary = '북마크 게시물 조회 API';
      #swagger.tags = ['POST']

    #swagger.responses[200] = {
        description: "사용자 북마크 게시물 조회 성공 응답(값이 있을 때)",
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
      #swagger.responses[201] = {
        description: "사용자 북마크 게시물 조회 성공 응답( 값이 없을 때)",
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
                      type: "array", example: []
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
                    errorCode: { type: "string", example: "U001" },
                    reason: { type: "string", example: "유저가 존재하지 않음" },
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
    const posts = await ScrapPosts(postToScrap(req.user))
    res.status(StatusCodes.OK).success(posts)
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
      #swagger.tags = ['POST']

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

//게시물 스크랩 하기
export const handlerPostScrap = async (req,res) => {
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
    console.log("게시물 스크랩을 요청하였습니다.");

    const scrapedPost = await createUserScrap(req.user.userId,req.params.postId);

    res.status(StatusCodes.OK).success(scrapedPost);
  }

//게시물 검색하기
export const handlerPostSearch = async (req,res) => {
    /* 
    #swagger.summary = '게시물 검색 API';
    #swagger.tags = ['Post']
    #swagger.description = '게시물을 검색하는 API입니다.'
    #swagger.parameters['query'] = {
        in: 'query',
        required: true,
        description: '검색 키워드',
        schema: { searchWord: 'itle' }
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
  console.log(req.query)
  const listOfPost = await getSearchedPostsList(req.query.searchWord);

  res.status(StatusCodes.OK).success(listOfPost);
}

//내가 쓴 게시물 조회 하기
export const handlerGetUserPost = async (req,res) => {
    /* 
    #swagger.summary = '작성한 게시물 조회 API';
    #swagger.tags = ['User']
    #swagger.description = '사용자 자신이 쓴 게시물 조회 API입니다.'
    
    #swagger.responses[200] = {
        description: "작성한 게시물 조회 성공 응답",
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
        description: "작성한 게시물 조회 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "P006" },
                                reason: { type: "string", example: "사용자가 작성한 게시물이 없습니다." },
                                data: {
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
export const handelPostDelete = async (req, res) => {
  /* 
  #swagger.summary = '게시글 삭제 API';
  #swagger.tags = ['POST']
  #swagger.description = '게시글의 상태를 inactive로 변경하는 API입니다.'
  #swagger.parameters['postId'] = {
      in: 'path',
      required: true,
      description: '삭제할 게시물의 ID',
      schema: { type: 'number' }
  }
  #swagger.responses[200] = {
      description: "게시글 삭제(상태 변경) 성공 응답",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      resultType: { type: "string", example: "SUCCESS" },
                      error: { type: "object", nullable: true, example: null },
                      success: { type: "object", nullable: true, example: null }
                  }
              }
          }
      }
  }
  #swagger.responses[400] = {
      description: "게시글 삭제 실패 응답",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      resultType: { type: "string", example: "FAIL" },
                      error: {
                          type: "object",
                          properties: {
                              errorCode: { type: "string", example: "P041" },
                              reason: { type: "string", example: "게시물 삭제에 실패했습니다." },
                              data: {}
                          }
                      },
                      success: { type: "object", nullable: true, example: null }
                  }
              }
          }
      }
  }
  */

  const { postId } = req.params;

  // 상태를 inactive로 변경하는 로직
  await updatePostStatus(postId, 'inactive');

  res.status(StatusCodes.OK).json({
      resultType: "SUCCESS",
      error: null,
      success: null
  });
}
export const getPostDetail = async (req, res) => {
  /* 
  #swagger.summary = '게시글 상세조회 API';
  #swagger.tags = ['POST']
  #swagger.description = '게시글의 상세 정보를 조회하는 API입니다.'
  #swagger.parameters['postId'] = {
      in: 'path',
      required: true,
      description: '상세조회할 게시물의 ID',
      schema: { type: 'number' }
  }
  #swagger.responses[200] = {
      description: "게시글 상세조회 성공 응답",
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
                              title: { type: "string", example: "게시글 제목" },
                              createdAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" },
                              liked: { type: "boolean", example: true },
                              body: { type: "string", example: "게시글 내용" }
                          }
                      }
                  }
              }
          }
      }
  }
  #swagger.responses[400] = {
      description: "게시글 상세조회 실패 응답",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      resultType: { type: "string", example: "FAIL" },
                      error: {
                          type: "object",
                          properties: {
                              errorCode: { type: "string", example: "P012" },
                              reason: { type: "string", example: "게시물 상세조회에 실패했습니다." },
                              data: {}
                          }
                      },
                      success: { type: "object", nullable: true, example: null }
                  }
              }
          }
      }
  }
  */

  const { postId } = req.params;

  // 게시글 상세조회 로직
  const postDetail = await getPostById(postId); // 게시글을 ID로 조회하는 함수

  // 'liked' 여부를 확인하는 로직 (예: 사용자가 좋아요를 눌렀는지 확인)
  const liked = await checkIfPostLikedByUser(postId, req.user.id);

  res.status(StatusCodes.OK).json({
      resultType: "SUCCESS",
      error: null,
      success: {
          title: postDetail.title,
          createdAt: postDetail.createdAt,
          liked: liked,
          body: postDetail.body
      }
  });
}
