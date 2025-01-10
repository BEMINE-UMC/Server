import { StatusCodes } from "http-status-codes";
import { fullTemplateLoad } from "../services/template.service.js";

export const handleFullTemplateLoad = async (req, res, next) => {
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
      #swagger.tags = ['Template']
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