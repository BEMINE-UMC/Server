import { responseFromTemplate } from "../dtos/template.dto.js";
import { InvalidTemplateIdError, NonexistentTemplateError } from "../errors/template.error.js";
import { checkTemplateExists, getTemplateInfo, checkTemplateStatus } from "../repositories/template.repository.js";

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

    const templateStatus = await checkTemplateStatus(numericTemplateId);
    if(!templateStatus) {
        throw new InactiveTemplateError("이미 삭제 처리된 template 입니다.", { requestedTemplateId : numericTemplateId });
    }

    const deletedTemplateInfo = await deleteTemplate(numericTemplateId); // 여기부터 수정하기
    return responseFromTemplate(deletedTemplateInfo);
}

