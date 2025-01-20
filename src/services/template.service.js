import { NotExsistsUserError } from '../errors/user.error.js';
import { responseFromTemplate, responseFromTemplateDeletion, responseFromTemplateAndLike, responsePopularTemplates } from "../dtos/template.dto.js";
import { InvalidTemplateIdError, NonexistentTemplateError, InactiveTemplateError, NullStatusTemplateError } from "../errors/template.error.js";
import { checkTemplateExists, getTemplateFileInfo, deleteTemplate, getFullTemplateInfo , findPopularTemplates } from "../repositories/template.repository.js";

// 템플릿 전체 불러오기 
export const fullTemplateLoad = async (templateId) => { 
    const numericTemplateId = parseInt(templateId);
    if (isNaN(numericTemplateId) || numericTemplateId <= 0) {
        throw new InvalidTemplateIdError("유효하지 않은 templateId 입니다.", { requestedTemplateId : numericTemplateId });
    }
    
    const templateExistence = await checkTemplateExists(numericUserId, numericTemplateId); 
    if (!templateExistence) { // templateExistence이 null일 때 (=템플릿이 존재하지 않을 때)
        throw new NonexistentTemplateError("존재하지 않는 template 입니다.",  { requestedTemplateId : numericTemplateId }); 
    }

    // !! getFullTemplateInfo 수정해서 처리하기!!

    return responseFromTemplate(templateInfo);
}


// 템플릿 파일 조회하기 
export const templateFileInfo = async (data) => {
    const numericUserId = parseInt(userId);
    const numericTemplateId = parseInt(templateId);

    if (isNaN(data.userId) || data.userId <= 0) {
        throw new NotExsistsUserError("유효하지 않은 userId 입니다.", data.userId);
    }

    const templateExistence = await checkTemplateExists(data.templateId); 
    if (!templateExistence) { // templateExistence이 null일 때 (=템플릿이 존재하지 않을 때)
        throw new NonexistentTemplateError("존재하지 않는 template 입니다.",  { requestedTemplateId : data.templateId }); 
    }

    const templateViewInfo = await getTemplateFileInfo(data.userId, data.templateId);
    if (!templateViewInfo) { // templateViewInfo가 null일 때 (= userId와 templateId가 매칭되는 템플릿 좋아요 정보가 존재하지 않을 때)
        throw new NonexistentTemplateLike("Template에 대한 좋아요 여부 정보가 없습니다.",  { requestedUserId: data.userId, requestedTemplateId : data.templateId });
    }

    return responseFromTemplateAndLike(templateViewInfo); // 여기부터 수정!!
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

//인기많은 템플릿 정보
export const getPopularTemplates = async () => {
    const templates = await findPopularTemplates();
    return responsePopularTemplates(templates);
};