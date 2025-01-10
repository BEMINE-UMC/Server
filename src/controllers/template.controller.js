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