import { StatusCodes } from "http-status-codes";

// 템플릿 단일 조회 요청
export const handleViewTemplate = async (req, resizeBy, next) => {
    /* 
    #swagger.summary = '템플릿 단일 조회 API';
    #swagger.responses[200] = {
        description: "템플릿 단일 조회 성공 응답",
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
        desciption: "템플릿 단일 조회 실패 응답",
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