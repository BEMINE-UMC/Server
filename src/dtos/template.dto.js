// 템플릿 상세 정보 조회 DTO (controller->service)
export const templateToDetailInfo = (template)=>{
    return{
      templateId: parseInt(template.templateId),
    }
  }

// 템플릿 상세 정보 조회 DTO (service->controller)
export const responseFromDetailInfo = (templateInfo) => {
    const createdAt = new Date(templateInfo.created_at);
    const updatedAt = new Date(templateInfo.updated_at);

    return {
        templateId: templateInfo.id || "",
        userId: templateInfo.user_id || "",
        title: templateInfo.title || "",
        filePPT: templateInfo.file_ppt,
        filePDF: templateInfo.file_pdf,
        fileShareState: templateInfo.file_share_state || "",
        thumbnail: templateInfo.thumbnail,
        createdAt,
        updatedAt, 
    };
};

// 템플릿 파일 조회 DTO (controller->service)
export const templateToFileInfo = (user, params)=>{
    return{
        userId: parseInt(user.userId),
        templateId: parseInt(params.templateId),
    }
  }

// 템플릿 파일 조회 DTO (service->controller)
export const responseFromTemplateAndLike = (templateViewInfo) => {
    return {
        filePDF: templateViewInfo.file_pdf,
        filePPT: templateViewInfo.file_ppt,
        fileShareState: templateViewInfo.file_share_state || "",
        fileLikeStatus: templateViewInfo.like_status,
    };
};

// 템플릿 삭제 후 DTO (service->controller)
export const responseFromTemplateDeletion = (deletedTemplateInfo) => {
    const inactiveDate = new Date(deletedTemplateInfo.inactive_date);

    return {
        status: deletedTemplateInfo.status,
        inactiveDate,
    };
};

// 메인 - 템플릿 인기순 출력 API 
// 좋아요 수를 포함시키는 것이 좋을 수 있습니다
export const responsePopularTemplates = (templates) => {
    return templates.map(template => ({
        id: template.id,
        title: template.title,
        thumbnail: template.thumbnail
    }));
};