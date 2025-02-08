// 템플릿 상세 정보 조회 DTO (controller->service)
export const templateToDetailInfo = (template)=>{
    return{
        templateId: parseInt(template.templateId),
    }
}

// 템플릿 상세 정보 조회 DTO (service->controller)
export const responseFromDetailInfo = (templateInfo) => { // 처음 생성하는 템플릿은 모두 빈 문자열이 가도록 함!
    return {
        templateId: templateInfo.templateId,
        thumbnail: templateInfo.thumbnail || "",
        filePDF: templateInfo.file_pdf || "",
        title: templateInfo.title || "",
        fileShareState: templateInfo.file_share_state || "",
        templateCategoryId: templateInfo.t_categoryId || "",
        templateCategoryName: templateInfo.t_categoryName || ""
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
        templateId: templateViewInfo.templateId,
        filePDF: templateViewInfo.file_pdf,
        fileShareState: templateViewInfo.file_share_state || "",
        fileLikeStatus: templateViewInfo.like_status,
    };
};

// 템플릿 삭제 전 DTO (controller->service)
export const templateToDeletion = (template) => {
    return{
        templateId: parseInt(template.templateId),
    }
};

// 템플릿 삭제 후 DTO (service->controller)
export const responseFromTemplateDeletion = (deletedTemplateInfo) => {
    const inactiveDate = new Date(deletedTemplateInfo.inactive_date);

    return {
        message: "템플릿이 정상적으로 삭제되었습니다!",
        templateId: deletedTemplateInfo.id,
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

// 템플릿 생성 요청 DTO
export const templateToCreate = (body, files, user) =>{
    return {
        title: body.title,
        userId: user.userId,
        filePDF: files.filePDF? files.filePDF[0].location : null,
        fileShareState: body.fileShareState,
        thumbnail: files.thumbnail? files.thumbnail[0].location : null,
        tCategoryId: body.tCategoryId ? parseInt(body.tCategoryId) : null
    }
}

// 템플릿 생성 전송 DTO
export const responseFromTemplateCreate = (data) =>{
    return{
        templateId: data.id,
        userId: data.userId,
        title: data.title,
        filePDF: data.filePDF,
        fileShareState: data.fileShareState,
        tCategoryId: data.tCategoryId,
        thumbnail: data.thumbnail,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    }
}

// 템플릿 수정 요청 DTO
export const templateToUpdate = (params,body, files, user) =>{
    return {
        templateId: parseInt(params.templateId),
        title: body.title,
        userId: user.userId,
        filePDF: files.filePDF? files.filePDF[0].location : null,
        fileShareState: body.fileShareState,
        thumbnail: files.thumbnail? files.thumbnail[0].location : null,
        tCategoryId: body.tCategoryId ? parseInt(body.tCategoryId) : null
    }
}

// 템플릿 수정 전송 DTO
export const responseFromTemplateUpdate = (data) =>{
    return{
        templateId: data.id,
        userId: data.userId,
        title: data.title,
        filePDF: data.filePDF,
        fileShareState: data.fileShareState,
        tCategoryId: data.tCategoryId,
        thumbnail: data.thumbnail,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    }
}

// 좋아요 누른 템플릿 응답 DTO
export const responseFromLikedTemplate = (likedTemplate) => {
    return {
        id: likedTemplate.id,
        userId: likedTemplate.userId,
        templateId: likedTemplate.templateId,
        status: likedTemplate.status,
        createdAt: likedTemplate.createdAt,
        updatedAt: likedTemplate.updatedAt
      }
};

// 템플릿 목록 조회 (로그인 전) (controller->service)
export const postToAllTemplates = (query) => {
    return{
        categoryId: (query.categoryId === undefined ? undefined : parseInt(query.categoryId)),
        offset: (query.offset === undefined ? 0 : parseInt(query.offset)), // 기본값 부여
        limit: (query.limit === undefined ? 20 : parseInt(query.limit)) // 기본값 부여
    }
}

// 템플릿 목록 조회 (로그인 전) (service->controller)
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
            categoryName: template.category_name,
            surveyCount: template.survey_count
        }
    });
}

// 템플릿 목록 조회 (로그인 후) (controller->service)
export const postToAllTemplatesLoggedIn = (user, query) => {
    return{
        userId: parseInt(user.userId),
        categoryId: (query.categoryId == undefined ? undefined : parseInt(query.categoryId)),
        offset: (query.offset === undefined ? 0 : parseInt(query.offset)), // 기본값 부여
        limit: (query.limit === undefined ? 20 : parseInt(query.limit)) // 기본값 부여
    }
}

// 템플릿 목록 조회 (로그인 후) (service->controller)
export const responseFromAllTemplatesLoggedIn = (templates) => {
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
            categoryName: template.category_name,
            likedStatus: template.liked_status === null ? false : Boolean(template.liked_status), // liked_template 테이블에 없는 포스트는 null이므로 false으로 처리
            surveyCount: template.survey_count,
        }
    });
}
