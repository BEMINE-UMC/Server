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
        filePDF: templateInfo.file_ppt,
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

// 템플릿 목록 조회 (로그인 전) (controller->service)
export const postToAllTemplates = (query) => {
    return{
        categoryId: (query.categoryId == undefined ? undefined : parseInt(query.categoryId)),
        offset: (query.offset === undefined ? 0 : parseInt(query.offset)), // 기본값 부여
        limit: (query.limit === undefined ? 20 : parseInt(query.limit)) // 기본값 부여
    }
}

// 게시물 전체 조회 (로그인 전) (controller->service)
export const responseFromAllTemplates = (templates) => {
    return templates.map(template => {
        const templateCreatedAt = new Date(template.template_created_at);

        return {
            templateCreatedAt,
            templateId: template.template_id,
            title: template.title,
            thumbnail: template.thumbnail,
            authorId: template.author_id,
            authorName: template.author_name,
            categoryId: template.category_id,
            categoryName: template.category_name
        }
    });
}