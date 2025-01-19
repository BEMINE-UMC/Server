import { responseFromTemplate } from "../dtos/template.dto.js";
import { InvalidTemplateIdError, NonexistentTemplateError } from "../errors/template.error.js";
import { getFullTemplateInfo, getTemplateViewInfo } from "../repositories/template.repository.js";

// 템플릿 전체 불러오기 
export const fullTemplateLoad = async (templateId) => {
    const numericTemplateId = parseInt(templateId);
    if (isNaN(numericTemplateId) || numericTemplateId <= 0) {
        throw new InvalidTemplateIdError("유효하지 않은 templateId 입니다.", { requestedTemplateId : numericTemplateId });
    }
    
    const templateInfo = await getFullTemplateInfo(numericTemplateId);
    if (!templateInfo) { // templateInfo가 null일 때 (=없을 때)
        throw new NonexistentTemplateError("존재하지 않는 template 입니다.",  { requestedTemplateId : numericTemplateId }); 
    }

    return responseFromTemplate(templateInfo);
}

// 템플릿 단일 조회하기 
export const singleTemplateView = async (templateId) => {
    const numericTemplateId = parseInt(templateId);
    if (isNaN(numericTemplateId) || numericTemplateId <= 0) {
        throw new InvalidTemplateIdError("유효하지 않은 templateId 입니다.", { requestedTemplateId : numericTemplateId });
    }
    
    const templateInfo = await getTemplateViewInfo(numericTemplateId);
    if (!templateInfo) { // templateInfo가 null일 때 (=없을 때)
        throw new NonexistentTemplateError("존재하지 않는 template 입니다.",  { requestedTemplateId : numericTemplateId }); 
    }

    return responseFromTemplate(templateInfo);
}
