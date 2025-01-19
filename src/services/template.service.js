import { responseFromTemplate, responseFromTemplateDeletion } from "../dtos/template.dto.js";
import { InvalidTemplateIdError, NonexistentTemplateError, InactiveTemplateError, NullStatusTemplateError } from "../errors/template.error.js";
import { checkTemplateExists, getTemplateInfo, deleteTemplate } from "../repositories/template.repository.js";

// 템플릿 전체 불러오기 
export const fullTemplateLoad = async (templateId) => {
    const numericTemplateId = parseInt(templateId);
    if (isNaN(numericTemplateId) || numericTemplateId <= 0) {
        throw new InvalidTemplateIdError("유효하지 않은 templateId 입니다.", { requestedTemplateId : numericTemplateId });
    }
    
    const templateInfo = await getTemplateInfo(numericTemplateId);
    if (!templateInfo) { // templateInfo가 null일 때 (=없을 때)
        throw new NonexistentTemplateError("존재하지 않는 template 입니다.",  { requestedTemplateId : numericTemplateId }); 
    }

    return responseFromTemplate(templateInfo);
}

// 템플릿 삭제하기 
export const templateDeletion = async (templateId) => {
    const numericTemplateId = parseInt(templateId);
    if (isNaN(numericTemplateId) || numericTemplateId <= 0) {
        throw new InvalidTemplateIdError("유효하지 않은 templateId 입니다.", { requestedTemplateId : numericTemplateId });
    }
    
    const templateExistence = await checkTemplateExists(numericTemplateId);
    if (!templateExistence) { // templateInfo가 null일 때 (=없을 때)
        throw new NonexistentTemplateError("존재하지 않는 template 입니다.",  { requestedTemplateId : numericTemplateId }); 
    }

    const templateInfo = await deleteTemplate(numericTemplateId); // 여기부터 수정하기
    if(templateInfo == 'inactive') { 
        throw new InactiveTemplateError("이미 삭제된 template 입니다.", { requestedTemplateId : numericTemplateId });
    } else if (!templateInfo) { // templateStatus === null인 경우
        throw new NullStatusTemplateError("템플릿의 상태값이 null입니다. Null인 이유를 확인해주세요.", { requestedTemplateId : numericTemplateId });
    }
    
    return responseFromTemplateDeletion(templateInfo);
}

