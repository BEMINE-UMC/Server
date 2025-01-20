import { StatusCodes } from "http-status-codes";
import { fullTemplateLoad, templateDeletion , singleTemplateView , getPopularTemplates} from "../services/template.service.js";


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


// PPT 화면 미리보기
export const handlerGetTempleteView = async (req, res) => {
    /*
      #swagger.summary = '템플릿 조회 API';
      #swagger.tags = ['Get']
      #swagger.parameters['templateId'] = {
        in: 'query',
        description: '조회할 템플릿 ID',
        required: true,
        type: 'integer',
      }

      #swagger.responses[200] = {
        description: "템플릿 조회 성공 응답",
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
                    templateId: { type: "integer", example: 1 },
                    file: { type: "string", example: "url" }
                  }
                }
              }
            }
          }
        }
      };

      #swagger.responses[400] = {
        description: "템플릿 조회 실패 응답",
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
                    reason: { type: "string", example: "존재하지 않는 템플릿입니다." },
                    data: {
                      type: "object",
                      properties: {
                        templateId: { type: "integer", example: 1 }
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
        console.log("\n템플릿 전체 불러오기를 요청했습니다!");
        console.log(`요청된 템플릿 아이디입니다: ${req.params.templateId}`);

        const deletedTemplate = await templateDeletion(req.params.templateId);
        res.status(StatusCodes.OK).success(deletedTemplate);
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

export const handlerCreateTemplateLike = async (req, res, next) => {
    /* 
    #swagger.summary = '템플릿 좋아요 API';
    #swagger.tags = ['Post']
    #swagger.description = '템플릿 좋아요 하는 API입니다.'
    #swagger.responses[200] = {
        description: "템플릿 좋아요 성공 응답",
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
                                title: { type: "string", example: "Title" },
                                file: { type: "string", example: "url" },
                                fileShareState: { type: "string", example: "private" },
                                thumbnail: { type: "string", example: "url" },
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
        description: "템플릿 좋아요 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "T003" },
                                reason: { type: "string", example: "이미 좋아요 누른 템플릿입니다." },
                                data: {
                                    type: "object",
                                    properties: {
                                        templateId: { type: "number", example: 1 },
                                        userId:  { type: "number", example: 1 }
                                    },
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

// 템플릿 단일 조회 요청
export const handleViewTemplate = async (req, res, next) => {
    /* 
    #swagger.summary = '템플릿 단일 조회 API';
    #swagger.tags = ['Get']
    #swagger.description = '템플릿 단일 조회 API입니다.'
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
        description: "템플릿 단일 조회 실패 응답",
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
        console.log("\n템플릿 단일 조회를 요청했습니다!");

        const singleTemplate = await singleTemplateView(req.params.userId, req.params.templateId);
        res.status(StatusCodes.OK).success(singleTemplate);
    } catch (error) {
        next(error);
    }
}


// 인기 템플릿 조회회
export const handlePopularTemplates = async (req, res, next) => {
    try {
        // #swagger.tags = ['Template']
        // #swagger.summary = '인기 템플릿 목록 조회'
        // #swagger.description = '홈 화면 상단에 표시될 인기 템플릿 목록을 조회합니다. 좋아요 수가 많은 순으로 정렬되며, 좋아요 수가 동일한 경우 최신순으로 정렬됩니다.'

        /* #swagger.responses[200] = {
            description: "조회 성공 (데이터가 있는 경우)",
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
                                        title: { type: "string", example: "2024 마케팅 트렌드 분석" },
                                        thumbnail: { type: "string", example: "thumbnail_url.jpg" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } */

        /* #swagger.responses[200] = {
            description: "조회 성공 (데이터가 없는 경우)",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            resultType: { type: "string", example: "SUCCESS" },
                            error: { type: "null", example: null },
                            success: {
                                type: "array",
                                example: []
                            }
                        }
                    }
                }
            }
        } */

        /* #swagger.responses[500] = {
            description: "서버 오류 (데이터베이스 연결 실패 등)",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            resultType: { type: "string", example: "FAIL" },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: { type: "string", example: "T25" },
                                    reason: { type: "string", example: "데이터베이스 연결에 실패했습니다." },
                                    data: { type: "null", example: null }
                                }
                            },
                            success: { type: "null", example: null }
                        }
                    }
                }
            }
        } */

        const templates = await getPopularTemplates();
        res.success(templates);
    } catch (error) {
        next(error);
    }
};