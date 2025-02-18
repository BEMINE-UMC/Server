import { StatusCodes } from "http-status-codes";
import { detailTemplateInfoLoad, templateDeletion , templateFileInfo , getPopularTemplates, allTemplatesInfoLoad, allTemplatesInfoLoadLoggedIn, createTemplateLike, templateCreate, templateUpdate, createTemplateSurvey } from "../services/template.service.js";
import { templateToCreate, templateToDetailInfo, templateToDeletion, templateToFileInfo, postToAllTemplates, postToAllTemplatesLoggedIn, templateToUpdate, requestDtoToSurvey } from "../dtos/template.dto.js";


// 템플릿 상세 정보 불러오기 요청
export const handleDetailTemplateInfoLoad = async (req, res, next) => {
    /* 
    #swagger.summary = '템플릿 상세 정보 조회 API (템플릿 올리기 화면)';
    #swagger.tags = ['Template']
    #swagger.description = '템플릿 올리기 화면에서 템플릿의 정보를 조회하는 API입니다. (더 자세한 내용은 노션 API 명세서에서 확인해주세요)'
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses[200] = {
        description: "템플릿 상세 정보 조회 성공 응답",
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
                                thumbnail: { type: "string", example: "https://example.com/images/thumb1.jpg" },
                                filePDF: { type: "string", example: "https://example.com/files/template1.pdf" },
                                title: { type: "string", example: "Template Title 1" },
                                fileShareState: { type: "string", example: "savable" },
                                templateCategoryId: { type: "integer", example: 1 },
                                templateCategoryName: { type: "string", example: "콘텐츠 마케터" }
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "템플릿 상세 정보 조회 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "T20" },
                                reason: { type: "string", example: "유효하지 않은 templateId 입니다." },
                                data: {
                                    type: "object",
                                    properties: {
                                        requestedTempalteId: { type: "integer", example: 0 }
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
        console.log("\n템플릿 상세 정보 불러오기를 요청했습니다!");
        console.log(`요청된 템플릿 아이디입니다: ${req.params.templateId}`);

        const template = await detailTemplateInfoLoad(templateToDetailInfo(req.params));
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
    #swagger.tags = ['Template']
    #swagger.description = '템플릿을 삭제하는 API입니다. (더 자세한 내용은 노션 API 명세서에서 확인해주세요)'
    #swagger.security = [{
        "bearerAuth": []
    }]
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
                                message: { type: "string", example: "템플릿이 정상적으로 삭제되었습니다!"},
                                templateId: { type: "integer", example: 1 },
                                status: { type: "string", example: "inactive" },
                                inactiveDate: { type: "string", format: "date", example: "2025-01-27T12:40:39.649Z"}
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "템플릿 삭제 실패 응답.",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "T20" },
                                reason: { type: "string", example: "유효하지 않은 templateId 입니다." },
                                data: {
                                    type: "object",
                                    properties: {
                                        requestedTempalteId: { type: "integer", example: 0 }
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

        const deletedTemplate = await templateDeletion(templateToDeletion(req.params));
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

// 템플릿 생성
export const handlerTemplateCreate = async(req,res, next)=>{
    /*
    #swagger.summary = '템플릿 생성 API';
    #swagger.tags = ['Template']
    #swagger.description = '템플릿을 생성하는 API입니다.'
    #swagger.requestBody = {
        required: true,
        content: {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        title: { type: "string", example: "New Title", description: "템플릿 제목" },
                        filePDF: {
                            type: "string",
                            format: "binary",
                            description: "업로드할 PDF 파일"
                        },
                        fileShareState: {
                            type: "string",
                            example: "public",
                            description: "파일 공유 상태 (public 또는 private)"
                        },
                        thumbnail: {
                            type: "string",
                            format: "binary",
                            description: "업로드할 썸네일 이미지"
                        },
                        tCategoryId: {
                            type: "number",
                            description: "템플릿 카테고리 ID",
                            example: 1
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: "템플릿 생성 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "SUCCESS", description: "결과 타입" },
                        error: { type: "object", nullable: true, example: null },
                        success: {
                            type: "object",
                            properties: {
                                templateId: { type: "number", example: 1, description: "템플릿 ID" },
                                userId: { type: "number", example: 1, description: "사용자 ID" },
                                title: { type: "string", example: "New Title", description: "템플릿 제목" },
                                filePDF: {
                                    type: "string",
                                    example: "https://example.com/new-file/template.pdf",
                                    description: "업로드된 PDF 파일 경로"
                                },
                                fileShareState: {
                                    type: "string",
                                    example: "private",
                                    description: "파일 공유 상태"
                                },
                                tCategoryId: { type: "number", example: 1, description: "템플릿 카테고리 ID" },
                                thumbnail: {
                                    type: "string",
                                    example: "https://example.com/new-image/thumb1.jpg",
                                    description: "업로드된 썸네일 이미지 경로"
                                },
                                createdAt: {
                                    type: "string",
                                    format: "date-time",
                                    example: "2025-01-10T00:41:23.000Z",
                                    description: "템플릿 생성 시간"
                                },
                                updatedAt: {
                                    type: "string",
                                    format: "date-time",
                                    example: "2025-01-10T00:41:23.000Z",
                                    description: "템플릿 업데이트 시간"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "템플릿 생성 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL", description: "결과 타입" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "T001", description: "에러 코드" },
                                reason: { type: "string", example: "템플릿 카테고리를 설정해주세요", description: "에러 이유" },
                            }
                        },
                        success: { type: "object", nullable: true, example: null }
                    }
                }
            }
        }
    }
*/

    const template = await templateCreate(templateToCreate(req.body, req.files, req.user))
    res.status(StatusCodes.OK).success(template);
}

// 템플릿 수정
export const handlerTemplateUpdate =async (req,res,next) =>{
    /*
        #swagger.summary = '템플릿 수정 API';
        #swagger.tags = ['Template']
        #swagger.description = '템플릿을 수정하는 API입니다.'
        #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            title: { type: "string", example: "New Title", description: "템플릿 제목" },
                            filePDF: {
                                type: "string",
                                format: "binary",
                                description: "업로드할 PDF 파일"
                            },
                            fileShareState: {
                                type: "string",
                                example: "public",
                                description: "파일 공유 상태 (public 또는 private)"
                            },
                            thumbnail: {
                                type: "string",
                                format: "binary",
                                description: "업로드할 썸네일 이미지"
                            },
                            tCategoryId: {
                                type: "number",
                                example: 1,
                                description: "템플릿 카테고리 ID"
                            }
                        }
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: "템플릿 수정 성공 응답",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            resultType: { type: "string", example: "SUCCESS", description: "결과 타입" },
                            error: { type: "object", nullable: true, example: null },
                            success: {
                                type: "object",
                                properties: {
                                    templateId: { type: "number", example: 1, description: "템플릿 ID" },
                                    userId: { type: "number", example: 1, description: "사용자 ID" },
                                    title: { type: "string", example: "New Title", description: "템플릿 제목" },
                                    filePDF: {
                                        type: "string",
                                        example: "https://example.com/new-file/template.pdf",
                                        description: "업로드된 PDF 파일 경로"
                                    },
                                    fileShareState: {
                                        type: "string",
                                        example: "private",
                                        description: "파일 공유 상태"
                                    },
                                    tCategoryId: { type: "number", example: 1, description: "템플릿 카테고리 ID" },
                                    thumbnail: {
                                        type: "string",
                                        example: "https://example.com/new-image/thumb1.jpg",
                                        description: "업로드된 썸네일 이미지 경로"
                                    },
                                    createdAt: {
                                        type: "string",
                                        format: "date-time",
                                        example: "2025-01-10T00:41:23.000Z",
                                        description: "템플릿 생성 시간"
                                    },
                                    updatedAt: {
                                        type: "string",
                                        format: "date-time",
                                        example: "2025-01-10T00:41:23.000Z",
                                        description: "템플릿 수정 시간"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        #swagger.responses[400] = {
            description: "템플릿 수정 실패 응답",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            resultType: {
                                type: "string",
                                example: "FAIL",
                                description: "결과 타입"
                            },
                            error: {
                                type: "object",
                                properties: {
                                    errorCode: {
                                        type: "string",
                                        example: "T001",
                                        description: "에러 코드"
                                    },
                                    reason: {
                                        type: "string",
                                        example: "유효하지 않은 templateId 입니다.",
                                        description: "에러 사유"
                                    },
                                    data: {
                                        type: "object",
                                        properties: {
                                            requestedTemplateId: {
                                                type: "number",
                                                example: 1,
                                                description: "요청된 템플릿 ID"
                                            }
                                        }
                                    }
                                }
                            },
                            success: {
                                type: "object",
                                nullable: true,
                                example: null,
                                description: "성공 데이터 (항상 null)"
                            }
                        }
                    }
                }
            }
        }
    */

    const template = await templateUpdate(templateToUpdate(req.params,req.body, req.files, req.user))
    res.status(StatusCodes.OK).success(template);
}

// 템플릿 좋아요 생성
export const handlerCreateTemplateLike = async (req, res, next) => {
    /* 
    #swagger.summary = '템플릿 좋아요 API';
    #swagger.tags = ['Template']
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
                                id: { type: "integer", example: 1 },
                                templateId: { type: "integer", example: 1 },
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
    */
    const likedTemplate = await createTemplateLike(req.user.userId, req.params.templateId);

    res.status(StatusCodes.OK).success(likedTemplate);

}

// 템플릿 파일 요청
export const handleGetTemplateFile = async (req, res, next) => {
    /* 
    #swagger.summary = '템플릿 파일 조회 API (템플릿 페이지)';
    #swagger.tags = ['Template']
    #swagger.description = '템플릿 페이지에서 한 템플릿을 조회하기 위한 API입니다. (더 자세한 내용은 노션 API 명세서에서 확인해주세요)'
    #swagger.responses[200] = {
        description: "템플릿 파일 조회 성공 응답",
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
                                filePDF: { type: "string", example: "https://example.com/files/template1.pdf" },
                                fileShareState: { type: "string", example: "저장 가능" },
                                fileLikeStatus: { type: "boolean", example: true },
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: "템플릿 파일 조회 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "T20" },
                                reason: { type: "string", example: "유효하지 않은 templateId 입니다." },
                                data: {
                                    type: "object",
                                    properties: {
                                        requestedTempalteId: { type: "integer", example: 0 }
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
        console.log("\n템플릿 파일 조회를 요청했습니다!");

        const singleTemplate = await templateFileInfo(templateToFileInfo(req.user, req.params));
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

// 템플릿 목록 조회 (로그인 전)
export const handleViewAllTemplates = async(req, res, next) => {
    /* 
    #swagger.summary = '템플릿 목록 조회 API (로그인 전)';
    #swagger.tags = ['Template']
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
    #swagger.description = '로그인 전 템플릿 목록을 조회를 하는 API입니다. (더 자세한 내용은 노션 API 명세서에서 확인해주세요)'
    #swagger.security = [{
        "bearerAuth": []
    }]
    #swagger.responses[200] = {
        description: "로그인 전 템플릿 목록 조회 성공 응답",
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
                                            templateCreatedAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" },
                                            templateId: { type: "integer", example: 1 },
                                            title: { type: "string", example: "Template Title 1" },
                                            thumbnail: { type: "string", example: "https://example.com/images/thumb1.jpg"},
                                            authorId: { type: "integer", example: 1 },
                                            authorName: { type: "string", example: "Alice" },
                                            categoryId: { type: "integer", example: 1 },
                                            categoryName: { type: "string", example: "콘텐츠 마케터" },
                                            surveyCountDesign: { type: "integer", example: 10 },
                                            surveyCountCredible: { type: "integer", example: 0},
                                            surveyCountUseful: { type: "integer", example: 0},
                                            totalLikes: { type: "integer", exmaple: 0 }
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
        description: "로그인 전 템플릿 목록 조회 실패 응답.",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "T26" },
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
        console.log("\n템플릿 목록 조회를 요청했습니다! (로그인 전)");

        const posts = await allTemplatesInfoLoad(postToAllTemplates(req.query));

        res.status(StatusCodes.OK).success(posts);
    } catch (error) {
        next(error);
    }
};

// 템플릿 목록 조회 (로그인 후)
export const handleViewAllTemplatesLoggedIn = async(req, res, next) => {
/* 
    #swagger.summary = '템플릿 목록 조회 API (로그인 후)';
    #swagger.tags = ['Template']
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
    #swagger.description = '로그인 후 템플릿 목록 조회를 하는 API입니다. (더 자세한 내용은 노션 API 명세서에서 확인해주세요)'
    #swagger.responses[200] = {
        description: "로그인 후 템플릿 목록 조회 성공 응답",
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
                                            templateCreatedAt: { type: "string", format: "date", example: "2025-01-10T00:41:23.000Z" },
                                            templateId: { type: "integer", example: 1 },
                                            title: { type: "string", example: "Template Title 1" },
                                            thumbnail: { type: "string", example: "https://example.com/images/thumb1.jpg"},
                                            authorId: { type: "integer", example: 1 },
                                            authorName: { type: "string", example: "Alice" },
                                            categoryId: { type: "integer", example: 1 },
                                            categoryName: { type: "string", example: "콘텐츠 마케터" },
                                            likedStatus: { type: "boolean", example: false },
                                            surveyCountDesign: { type: "integer", example: 10 },
                                            surveyCountCredible: { type: "integer", example: 0},
                                            surveyCountUseful: { type: "integer", example: 0},
                                            totalLikes: { type: "integer", exmaple: 0 }
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
        description: "로그인 후 템플릿 목록 조회 실패 응답.",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "T26" },
                                reason: { type: "string", example: "유효하지 않은 categoryId 입니다." },
                                data: {
                                    type: "object",
                                    properties: {
                                        requestedCategoryId: { type: "integer", example: -1 }
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
        console.log("\n템플릿 목록 조회를 요청했습니다! (로그인 후)");

        const posts = await allTemplatesInfoLoadLoggedIn(postToAllTemplatesLoggedIn(req.user, req.query));

        res.status(StatusCodes.OK).success(posts);
    } catch (error) {
        next(error);
    }
};

export const handlerCreateTemplateSurvey = async(req, res, next) => {
    /* 
    #swagger.summary = '템플릿 설문 생성 API';
    #swagger.tags = ['Template']
    #swagger.description = '템플릿 설문을 생성하는 API입니다.'
    
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        starCount: { type: "integer", example: 5 },
                        content: { type: "string", example: "유용성" }
                    }
                }
            }
        }
    }

    #swagger.responses[200] = {
        description: "템플릿 설문 생성 성공 응답",
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
                                id: { type: "integer", example: 1 },
                                templateId: { type: "integer", example: 1 },
                                userId: { type: "integer", example: 1 },
                                starCount: { type: "integer", example: 5 },
                                content: { type: "string", example: "이 템플릿이 매우 유용했어요!" },
                                createdAt: { type: "string", format: "date-time", example: "2025-01-10T12:00:00Z" },
                                updatedAt: { type: "string", format: "date-time", example: "2025-01-10T12:00:00Z" },
                            }
                        }
                    }
                }
            }
        }
    }
*/

    const survey = await createTemplateSurvey(requestDtoToSurvey(req.user.userId,req.params,req.body));

    res.status(StatusCodes.OK).success(survey);
}