import { checkTemplateExists, checkTemplateStatusNull, getTemplateFileInfo, deleteTemplate, getDetailTemplateInfo , findPopularTemplates, postTemplateLike, newTempalteCreate, existingTemplateUpdate,getAllTemplatesInfo, getAllTemplatesInfoLoggedIn } from "../repositories/template.repository.js";
import {  responseFromTemplateDeletion, responseFromTemplateAndLike, responsePopularTemplates, responseFromDetailInfo, responseFromAllTemplates, responseFromAllTemplatesLoggedIn, responseFromLikedTemplate,responseFromTemplateCreate, responseFromTemplateUpdate } from "../dtos/template.dto.js";
import { InvalidTemplateIdError, NonexistentTemplateError, InactiveTemplateError, NullStatusTemplateError, PrivateTemplateError, NullTemplateLike, InvalidCategoryIdError, InvalidOffsetError, InvalidLimitError, NonexistentCategoryIdError, alreadyExistTemplateLike,NonTemplateCategoryId, NonExsistsTemplateError } from "../errors/template.error.js";
import {deleteImage} from "../../middleware.js";

// 템플릿 상세 정보 불러오기 
export const detailTemplateInfoLoad = async (data) => { 
    if (!Number.isInteger(data.templateId) || data.templateId <= 0) {
        throw new InvalidTemplateIdError("유효하지 않은 templateId 입니다.", { requestedTemplateId : data.templateId });
    }

    const templateExistence = await checkTemplateExists(data.templateId); 
    if (!templateExistence) { // 처음 생성하는 템플릿일 때 
        return responseFromDetailInfo({ templateId: data.templateId });
    }
    const templateStatusIsNull = await checkTemplateStatusNull(data.templateId);
    if (templateStatusIsNull) {
        throw new NullStatusTemplateError("템플릿의 상태값이 null입니다. Null인 이유를 확인해주세요.", { requestedTemplateId : data.templateId })
    }
    const templateInfo = await getDetailTemplateInfo(data.templateId); // 수정 했던 템플릿일 때

    return responseFromDetailInfo(templateInfo);
}


// 템플릿 파일 조회하기 
export const templateFileInfo = async (data) => {
    if (!Number.isInteger(data.templateId) || data.templateId <= 0) {
        throw new InvalidTemplateIdError("유효하지 않은 templateId 입니다.", { requestedTemplateId : data.templateId });
    }
    const templateExistence = await checkTemplateExists(data.templateId); 
    if (!templateExistence) { // templateExistence이 null일 때 (=템플릿이 존재하지 않을 때)
        throw new NonexistentTemplateError("존재하지 않는 template 입니다.",  { requestedTemplateId : data.templateId }); 
    }
    const templateStatusIsNull = await checkTemplateStatusNull(data.templateId);
    if (templateStatusIsNull) {
        throw new NullStatusTemplateError("템플릿의 상태값이 null입니다. Null인 이유를 확인해주세요.", { requestedTemplateId : data.templateId })
    }

    const templateViewInfo = await getTemplateFileInfo(data.userId, data.templateId);
    if (templateViewInfo === 'private'){
        throw new PrivateTemplateError("비공개 template 입니다. 템플릿 파일 조회가 불가합니다.", { requestedTemplateId : data.templateId })
    }
    if (templateViewInfo === null ) { // templateViewInfo가 null일 때 (= user가 templateId에 좋아요를 한 status null일 때)
        throw new NullTemplateLike("Template 좋아요 status이 null입니다. null인 이유를 확인해주세요.", { requestedUserId: data.userId, requestedTemplateId : data.templateId });
    }

    return responseFromTemplateAndLike(templateViewInfo);
}

  // 템플릿 삭제하기 
export const templateDeletion = async (data) => {
    if (!Number.isInteger(data.templateId) || data.templateId <= 0) {
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

//템플릿 좋아요 누르기
export const createTemplateLike = async(userId,templateId) => {
    const likedTemplate = await postTemplateLike(userId,templateId);

    if (likedTemplate==null) {
            throw new alreadyExistTemplateLike(
                "User already liked this template",
                {
                  userId: userId,
                  templateId: templateId,
                }
            );
        }

        return responseFromLikedTemplate(likedTemplate);

};

// 템플릿 목록 조회 (로그인 전)
export const allTemplatesInfoLoad = async (data) => {
    if (data.categoryId === undefined) {}
    else if (!Number.isInteger(data.categoryId) || data.categoryId <= 0) {
        throw new InvalidCategoryIdError("유효하지 않은 categoryId 입니다.", { requestedCategoryId : data.categoryId });
    }
    if (data.offset === undefined) {}
    else if (!Number.isInteger(data.offset) || data.offset < 0) {
        throw new InvalidOffsetError("유효하지 않은 offset 입니다.", { requestedOffset : data.offset });
    }
    if (data.limit === undefined) {}
    else if (!Number.isInteger(data.limit) || data.limit <= 0) {
        throw new InvalidLimitError("유효하지 않은 limit 입니다.", { requestedLimit : data.limit });
    }

    const allTemplatesInfo = await getAllTemplatesInfo(data.categoryId, data.offset, data.limit);
    if (allTemplatesInfo === null){
        throw new NonexistentCategoryIdError("존재하지 않는 categoryId 입니다.", data.categoryId);
    }

    return responseFromAllTemplates(allTemplatesInfo);
}

// 템플릿 목록 조회 (로그인 후)
export const allTemplatesInfoLoadLoggedIn = async (data) => {
    if (data.categoryId === undefined) {}
    else if (!Number.isInteger(data.categoryId) || data.categoryId <= 0) {
        throw new InvalidCategoryIdError("유효하지 않은 categoryId 입니다.", data.categoryId);
    }
    if (data.offset === undefined) {}
    else if (!Number.isInteger(data.offset) || data.offset < 0) {
        throw new InvalidOffsetError("유효하지 않은 offset 입니다.", data.offset);
    }
    if (data.limit === undefined) {}
    else if (!Number.isInteger(data.limit) || data.limit <= 0) {
        throw new InvalidLimitError("유효하지 않은 limit 입니다.", data.limit);
    }

    const allTemplatesInfo = await getAllTemplatesInfoLoggedIn(data.userId, data.categoryId, data.offset, data.limit);
    if (allTemplatesInfo === null){
        throw new NonexistentCategoryIdError("존재하지 않는 categoryId 입니다.", data.categoryId);
    }

    return responseFromAllTemplatesLoggedIn(allTemplatesInfo);
}
