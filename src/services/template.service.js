import {
    responseFromTemplateDeletion,
    responseFromTemplateAndLike,
    responsePopularTemplates,
    responseFromDetailInfo,
    responseFromTemplateCreate, responseFromTemplateUpdate
} from "../dtos/template.dto.js";
import {
    InvalidTemplateIdError,
    NonexistentTemplateError,
    InactiveTemplateError,
    NullStatusTemplateError,
    NonexistentTemplateLike,
    NullTemplateLike,
    NonTemplateCategoryId, NonExsistsTemplateError
} from "../errors/template.error.js";
import {
    checkTemplateExists,
    getTemplateFileInfo,
    deleteTemplate,
    getDetailTemplateInfo,
    findPopularTemplates,
    newTempalteCreate, existingTemplateUpdate
} from "../repositories/template.repository.js";
import {deleteImage} from "../../middleware.js";

// 템플릿 상세 정보 불러오기 
export const detailTemplateInfoLoad = async (data) => { 
    if (isNaN(data.templateId) || data.templateId <= 0) {
        throw new InvalidTemplateIdError("유효하지 않은 templateId 입니다.", { requestedTemplateId : data.templateId });
    }
    
    const templateExistence = await checkTemplateExists(data.templateId); 
    if (!templateExistence) { // templateExistence이 null일 때 (=템플릿이 존재하지 않을 때)
        throw new NonexistentTemplateError("존재하지 않는 template 입니다.",  { requestedTemplateId : data.templateId }); 
    }

    const templateInfo = await getDetailTemplateInfo(data.templateId);

    return responseFromDetailInfo(templateInfo);
}


// 템플릿 파일 조회하기 
export const templateFileInfo = async (data) => {
    if (isNaN(data.templateId) || data.templateId <= 0) {
        throw new InvalidTemplateIdError("유효하지 않은 templateId 입니다.", { requestedTemplateId : data.templateId });
    }
    const templateExistence = await checkTemplateExists(data.templateId); 
    if (!templateExistence) { // templateExistence이 null일 때 (=템플릿이 존재하지 않을 때)
        throw new NonexistentTemplateError("존재하지 않는 template 입니다.",  { requestedTemplateId : data.templateId }); 
    }

    const templateViewInfo = await getTemplateFileInfo(data.userId, data.templateId);
    if (templateViewInfo === 0) { // templateViewInfo가 0일 때 (= userId와 templateId가 매칭되는 템플릿 좋아요 정보가 존재하지 않을 때)
        throw new NonexistentTemplateLike("Template에 대한 좋아요 여부 정보가 없습니다.",  { requestedUserId: data.userId, requestedTemplateId : data.templateId });
    } else if (templateViewInfo === null ) { // templateViewInfo가 null일 때 (= user가 templateId에 좋아요를 한 status null일 때)
        throw new NullTemplateLike("Template 좋아요 status이 null입니다. null인 이유를 확인해주세요.", { requestedUserId: data.userId, requestedTemplateId : data.templateId });
    }

    return responseFromTemplateAndLike(templateViewInfo); // 여기부터 수정!!
}

  // 템플릿 삭제하기 
export const templateDeletion = async (data) => {
    if (isNaN(data.templateId) || data.templateId <= 0) {
        throw new InvalidTemplateIdError("유효하지 않은 templateId 입니다.", { requestedTemplateId : data.templateId });
    }
    const templateExistence = await checkTemplateExists(data.templateId);
    if (!templateExistence) { // templateInfo가 null일 때 (=없을 때)
        throw new NonexistentTemplateError("존재하지 않는 template 입니다.",  { requestedTemplateId : data.templateId }); 
    }

    const templateInfo = await deleteTemplate(data.templateId);
    if(templateInfo == 'inactive') { 
        throw new InactiveTemplateError("이미 삭제된 template 입니다.", { requestedTemplateId : data.templateId });
    } else if (!templateInfo) { // templateStatus === null인 경우
        throw new NullStatusTemplateError("템플릿의 상태값이 null입니다. Null인 이유를 확인해주세요.", { requestedTemplateId : data.templateId });
    }
    
    return responseFromTemplateDeletion(templateInfo);
}

//인기많은 템플릿 정보
export const getPopularTemplates = async () => {
    const templates = await findPopularTemplates();
    return responsePopularTemplates(templates);
};

// 템플릿 생성
export const templateCreate = async(data) =>{
    if(!data.tCategoryId)
        throw new NonTemplateCategoryId('템플릿 카테고리를 선택해주세요');

    const template = await newTempalteCreate(data);
    return responseFromTemplateCreate(template);
}

// 템플릿 수정
export const templateUpdate = async(data) =>{
    const confirm = await checkTemplateExists(data.templateId);
    if(!confirm)
        throw new NonExsistsTemplateError('템플릿이 존재하지 않음', data);
    const preThumbnail = confirm.thumbnail
    const prePDF = confirm.filePDF

    if(preThumbnail){
        await deleteImage(preThumbnail)
    }

    if(prePDF){
        await deleteImage(prePDF)
    }

    const template = await existingTemplateUpdate(data);
    return responseFromTemplateUpdate(template);
}