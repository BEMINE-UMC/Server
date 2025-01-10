import { StatusCodes } from "http-status-codes";
import { fullTemplateLoad } from "../services/template.service.js";

// 템플릿 전체 불러오기 요청
export const handleFullTemplateLoad = async (req, res, next) => {
    /* 
    #swagger.summary = '템플릿 전체 불러오기 API';
    #swagger.tags = ['Get']
    #swagger.description = '템플릿 전체를 불러오는 API입니다.'
    #swagger.responses[200] = {
        description: "템플릿 전체 불러오기 성공 응답",
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
                                templateId: { type: "number", example: 1 },
                                userId: { type: "number", example: 1 },
                                title: { type: "string", example: "Portfolio1 Template" },
                                file: { type: "string", example: "https://example.com/files/template1.pptx" },
                                fileShareState: { type: "string", example: "public" },
                                thumbnail: { type: "string", example: "https://example.com/images/thumb1.jpg" },
                                createdAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" },
                                updatedAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" }
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "템플릿 전체 불러오기 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "T001" },
                                reason: { type: "string", example: "유효하지 않은 templateId 입니다." },
                                data: {
                                    type: "object",
                                    properties: {
                                        requestedTempalteId: { type: "number", example: 0 }
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
        console.log("\n템플릿 전체 불러오기를 요청했습니다!");
        console.log(`요청된 템플릿 아이디입니다: ${req.params.templateId}`);

        const template = await fullTemplateLoad(req.params.templateId);
        res.status(StatusCodes.OK).success(template);
    } catch (error) {
        next(error);
    }
}

// 템플릿 삭제 요청
export const handleTemplateDelete = async (req, res, next) => {
    /* 
    #swagger.summary = '템플릿 삭제 API';
    #swagger.tags = ['Delete']
    #swagger.description = '템플릿을 삭제하는 API입니다.'
    #swagger.responses[200] = {
        description: "템플릿 삭제 성공 응답",
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
                                templateId: { type: "number", example: 1 },
                                message: { type: "string", example: "템플릿이 정상적으로 삭제되었습니다."}
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "템플릿 삭제 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "T001" },
                                reason: { type: "string", example: "유효하지 않은 templateId 입니다." },
                                data: {
                                    type: "object",
                                    properties: {
                                        requestedTempalteId: { type: "number", example: 0 }
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

// 템플릿 수정/생성 요청
export const handleTemplateCreateAndModify = async (req, res, next) => {
    /* 
    #swagger.summary = '템플릿 수정/생성 API';
    #swagger.tags = ['Put']
    #swagger.description = '템플릿을 수정/생성 하는 API입니다.'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        title: { type: "string", example: "New Title" },
                        file: { type: "string", example: "https://example.com/new-file/template.pptx" },
                        fileShareState: { type: "string", example: "private" },
                        thumbnail: { type: "string", example: "https://example.com/new-image/thumb1.jpg"}
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: "템플릿 수정/생성 성공 응답",
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
                                templateId: { type: "number", example: 1 },
                                userId: { type: "number", example: 1 },
                                title: { type: "string", example: "New Title" },
                                file: { type: "string", example: "https://example.com/new-file/template.pptx" },
                                fileShareState: { type: "string", example: "private" },
                                thumbnail: { type: "string", example: "https://example.com/new-image/thumb1.jpg" },
                                createdAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" },
                                updatedAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" }
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "템플릿 수정/생성 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "T001" },
                                reason: { type: "string", example: "유효하지 않은 templateId 입니다." },
                                data: {
                                    type: "object",
                                    properties: {
                                        requestedTempalteId: { type: "number", example: 0 }
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