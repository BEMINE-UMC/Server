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

// // 게시물 전체 조회 요청
export const handleViewAllPosts = async (req, res, next) => {
    /* 
    #swagger.summary = '게시물 전체 조회 API';
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
        desciption: "게시물 전체 조회 실패 응답",
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