import { StatusCodes } from "http-status-codes";
import { createUserLike, createUserScrap, getSearchedPostsList, RecentViewPosts, ScrapPosts, createOrUpdatePost, deletePost, getLikePost, getUserOwnPosts } from "../services/post.service.js";
import { getOtherPost, getPostDetailWithLikeStatus, allPostsInfoLoad, allPostsInfoLoadLoggedIn } from "../services/post.service.js";
import { postToRecent, postToScrap, postToAllPosts, postToAllPostsLoggedIn,createGetLikePostDTO } from "../dtos/post.dto.js";
import { imageUploader, deleteImage } from '../../middleware.js';



//게시물 좋아요 누르기
export const handlerPostLike = async (req, res, next) => {
  console.log("게시물 좋아요 누르기 요청");

  const likedPost = await createUserLike(req.user.userId, req.params.postId);

  res.status(StatusCodes.OK).success(likedPost);
  /* 
     #swagger.summary = '게시물 좋아요 API'
     #swagger.tags = ['POST']
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
                                     status: { type: "boolean", example: true },
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
     */
};


// 사용자가 작성한 다른 게시물 불러오기
export const handleOtherPost = async (req, res, next) => {

  /*
   #swagger.summary = '사용자가 작성한 다른 게시물 조회 API';
   #swagger.tags = ['POST']
 
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

  const otherPost = await getOtherPost(req.params.postId);

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

// 게시물 전체 조회 요청 (로그인 전)
export const handleViewAllPosts = async (req, res, next) => {
  /* 
  #swagger.summary = '게시물 전체 조회 API (로그인 전)';
  #swagger.tags = ['POST']
  #swagger.parameters: [
    { in: "query",
      name: "categoryId",
      schema: { type: "integer" },
      description: "카테고리 ID",
      required: false,
    }
  ]
  #swagger.parameters: [
    { in: "query",
      name: "offset",
      schema: { type: "integer" },
      description: "offset (기본값: 0)",
      required: false,
    }
  ]
  #swagger.parameters: [
    { in: "query",
      name: "limit",
      schema: { type: "integer" },
      description: "limit (기본값: 20)",
      required: false,
    }
  ]
  #swagger.description = '로그인 전 게시물 전체 조회를 하는 API입니다. (더 자세한 내용은 노션 API 명세서에서 확인해주세요)'
  #swagger.security = [{
      "bearerAuth": []
  }]
  #swagger.responses[200] = {
      description: "로그인 전 게시물 전체 조회 성공 응답",
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
                                          postCreatedAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" },
                                          postId: { type: "integer", example: 100 },
                                          title: { type: "string", example: "Post Title 100" },
                                          thumbnail: { type: "string", example: "https://example.com/pictures/pic100.jpg"},
                                          authorId: { type: "integer", example: 5 },
                                          authorName: { type: "string", example: "Eve" },
                                          categoryId: { type: "integer", example: 4 },
                                          categoryName: { type: "string", example: "바이럴 마케터" },
                                      }
                                  }
                              },
                              pagination: {
                                  type: "object", 
                                  properties: {
                                      cursor: { type: "integer", nullable: true }
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
      description: "로그인 전 게시물 전체 조회 실패 응답.",
      content: {
          "application/json": {
              schema: {
                  type: "object",
                  properties: {
                      resultType: { type: "string", example: "FAIL" },
                      error: {
                          type: "object",
                          properties: {
                              errorCode: { type: "string", example: "P20" },
                              reason: { type: "string", example: "유효하지 않은 categoryId 입니다." },
                              data: {
                                  type: "object",
                                  properties: {
                                      requestedCategoryId: { type: "integer", example: 0 }
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
    console.log("\게시물 전체 조회를 요청했습니다! (로그인 전)");

    const posts = await allPostsInfoLoad(postToAllPosts(req.query));

    res.status(StatusCodes.OK).success(posts);
  } catch (error) {
      next(error);
  }
}

// 게시물 전체 조회 요청 (로그인 후)
export const handleViewAllPostsLoggedIn = async (req, res, next) => {
  /* 
    #swagger.summary = '게시물 전체 조회 API (로그인 후)';
    #swagger.tags = ['POST']
    #swagger.parameters: [
      { in: "query",
        name: "categoryId",
        schema: { type: "integer" },
        description: "카테고리 ID",
        required: false,
      }
    ]
    #swagger.parameters: [
      { in: "query",
        name: "offset",
        schema: { type: "integer" },
        description: "offset (기본값: 0)",
        required: false,
      }
    ]
    #swagger.parameters: [
      { in: "query",
        name: "limit",
        schema: { type: "integer" },
        description: "limit (기본값: 20)",
        required: false,
      }
    ]
    #swagger.description = '로그인 후 게시물 전체 조회를 하는 API입니다. (더 자세한 내용은 노션 API 명세서에서 확인해주세요)'
    #swagger.responses[200] = {
        description: "로그인 후 게시물 전체 조회 성공 응답",
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
                                            postCreatedAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" },
                                            postId: { type: "integer", example: 100 },
                                            title: { type: "string", example: "Post Title 100" },
                                            thumbnail: { type: "string", example: "https://example.com/pictures/pic100.jpg"},
                                            authorId: { type: "integer", example: 5 },
                                            authorName: { type: "string", example: "Eve" },
                                            categoryId: { type: "integer", example: 4 },
                                            categoryName: { type: "string", example: "바이럴 마케터" },
                                            likedStatus: { type: "boolean", example: true },
                                            scrapStatus: { type: "boolean", example: false }
                                        }
                                    }
                                },
                                pagination: {
                                    type: "object", 
                                    properties: {
                                        cursor: { type: "integer", nullable: true }
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
        description: "로그인 후 게시물 전체 조회 실패 응답.",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "P20" },
                                reason: { type: "string", example: "유효하지 않은 categoryId 입니다." },
                                data: {
                                    type: "object",
                                    properties: {
                                        requestedCategoryId: { type: "integer", example: 0 }
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
    console.log("\게시물 전체 조회를 요청했습니다! (로그인 후)");

    const posts = await allPostsInfoLoadLoggedIn(postToAllPostsLoggedIn(req.user, req.query));

    res.status(StatusCodes.OK).success(posts);
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
                    example: [
                      { postId: 1, url: "thumbnail1.jpg" },
                      { postId: 2, url: "thumbnail2.jpg" }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    };
*/


  console.log("좋아요 누른 게시물 조회 요청");

  const likePost = await getLikePost(createGetLikePostDTO(req.user));

  res.status(StatusCodes.OK).success(likePost);
}

//게시물 스크랩 하기
export const handlerPostScrap = async (req, res) => {
  /* 
  #swagger.summary = '게시물 스크랩 API'
  #swagger.tags = ['POST']
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
                                  status: { type: "boolean", example: true },
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
  */
  console.log("게시물 스크랩을 요청하였습니다.");

  const scrapedPost = await createUserScrap(req.user.userId, req.params.postId);

  res.status(StatusCodes.OK).success(scrapedPost);
}
//게시물 검색하기
export const handlerPostSearch = async (req, res) => {
  /* 
  #swagger.summary = '게시물 검색 API';
  #swagger.tags = ['POST']
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
                                          id: { type: "number", example: 1 },
                                          userId: { type: "number", example: 1 },
                                          categoryId: { type: "number", example: 1 },
                                          title: { type: "string", example: "Title" },
                                          body: { type: "string", example: "Body" },
                                          thumbnail: { type: "string", example: "url"},
                                          image: { type: "string", example: "url"},
                                          status: { type: "string", example: "status"},
                                          inactivateDate: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" },
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
export const handlerGetUserPost = async (req, res) => {
  /* 
    #swagger.summary = '작성한 게시물 조회 API';
    #swagger.tags = ['POST']
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
                                type: "object",
                                  properties: {
                                      userId: { type: "intenger", example: 1}
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
  console.log("사용자 작성 게시물 조회를 요청하였습니다.");
  const myposts = await getUserOwnPosts(req.user.userId);

  res.status(StatusCodes.OK).success(myposts);
  }
//게시글 삭제 
export const handlePostDelete = async (req, res, next) => {
  /* 
#swagger.summary = '게시글 삭제 API'
#swagger.tags = ['POST']
#swagger.description = '게시글을 삭제합니다 (상태를 inactive로 변경). 작성자만 삭제가 가능하며, 이미지가 있는 경우 S3에서도 삭제.'

#swagger.parameters['postId'] = {
    in: 'path',
    required: true,
    type: 'integer',
    description: '삭제할 게시글 ID'
}

#swagger.responses[200] = {
    description: "게시글 삭제 성공",
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
                            message: { type: "string", example: "게시글이 삭제되었습니다." }
                        }
                    }
                }
            }
        }
    }
}

#swagger.responses[403] = {
    description: "삭제 권한 없음",
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    resultType: { type: "string", example: "FAIL" },
                    error: {
                        type: "object",
                        properties: {
                            errorCode: { type: "string", example: "P047" },
                            reason: { type: "string", example: "작성자가 아닙니다." },
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
  try {
    const { postId } = req.params;
    await deletePost(req.user.userId, postId);

    res.status(StatusCodes.OK).success({
      message: "게시글이 삭제되었습니다."
    });
  } catch (error) {
    next(error);
  }
};

//게시글 상세조회
export const getPostDetail = async (req, res, next) => {
  /* 
  #swagger.summary = '게시글 상세 조회 API'
  #swagger.tags = ['POST']
  #swagger.description = '게시글의 상세 정보를 조회합니다. 제목, 내용, 작성일, 수정일(있는 경우)을 반환하며, 현재 사용자의 좋아요 상태도 함께 제공합니다.'

  #swagger.responses[200] = {
      description: "게시글 상세 조회 성공",
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
                              title: { type: "string", example: "게시글 제목" },
                              body: { type: "string", example: "<p>게시글 내용입니다</p>" },
                              createdAt: { 
                                  type: "string", 
                                  format: "date-time", 
                                  example: "2024-01-21T12:00:00.000Z" 
                              },
                              updatedAt: { 
                                  type: "string", 
                                  format: "date-time", 
                                  example: "2024-01-22T15:30:00.000Z",
                                  nullable: true 
                              },
                              liked: { type: "boolean", example: true }
                          }
                      }
                  }
              }
          }
      }
  }
          #swagger.responses[404] = {
        description: "게시글이 존재하지 않음",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "P046" },
                                reason: { type: "string", example: "게시글을 찾을 수 없습니다." },
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
  try {
    const { postId } = req.params;
    const detail = await getPostDetailWithLikeStatus(req.user.userId, postId);

    res.status(StatusCodes.OK).success(detail);
  } catch (error) {
    next(error);
  }
};
//게시글 작성/수정 컨트롤러
export const handlePostWrite = async (req, res, next) => {

  /* 
    #swagger.summary = '게시글 작성/수정 API'
    #swagger.tags = ['POST']
    #swagger.description = '게시글을 작성하거나 수정합니다. postId 유무에 따라 생성/수정이 결정되며, 이미지는 반드시 S3 URL 형식이어야 합니다.'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        postId: { 
                            type: "integer", 
                            description: "수정할 게시글 ID (수정 시에만 필요)",
                            example: 1 
                        },
                        title: { 
                            type: "string", 
                            description: "게시글 제목",
                            example: "테스트 게시글" 
                        },
                        body: { 
                            type: "string", 
                            description: "게시글 본문 (HTML 형식)",
                            example: "<p>안녕하세요</p><img src='https://bemine-s3.s3.ap-northeast-2.amazonaws.com/bemine-images/example.jpg'><p>테스트입니다.</p>" 
                        },
                        categoryId: { 
                            type: "integer", 
                            description: "카테고리 ID",
                            example: 1 
                        },
                        thumbnail: { 
                            type: "string", 
                            description: "썸네일 이미지 URL (선택)",
                            example: null,
                            nullable: true 
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[201] = {
        description: "게시글 작성/수정 성공",
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
                                message: { type: "string", example: "게시글이 작성되었습니다." }
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "게시글 작성/수정 실패",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { 
                                    type: "string", 
                                    example: "P041" 
                                },
                                reason: { 
                                    type: "string", 
                                    example: "제목을 입력해주세요." 
                                },
                                data: { 
                                    type: "object",
                                    example: {}
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
    const { postId, title, body, categoryId, thumbnail } = req.body;
    const userId = req.user.userId;

    await createOrUpdatePost({
      postId,
      userId,
      title,
      body,
      categoryId,
      thumbnail
    });

    res.status(StatusCodes.CREATED).success({
      message: postId ? "게시글이 수정되었습니다." : "게시글이 작성되었습니다."
    });
  } catch (error) {
    next(error);
  }
}
