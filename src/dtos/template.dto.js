// 템플릿 전체 불러오기 DTO (service->controller)
export const responseFromTemplate = (templateInfo) => {
    const createdAt = new Date(templateInfo.created_at);
    const updatedAt = new Date(templateInfo.updated_at);

    return {
        templateId: templateInfo.id || "",
        userId: templateInfo.user_id || "",
        title: templateInfo.title || "",
        file: templateInfo.file,
        fileShareState: templateInfo.file_share_state || "",
        thumbnail: templateInfo.thumbnail,
        createdAt,
        updatedAt, 
    };
};

// 템플릿 단일 조회 DTO (service->controller)
export const responseFromTemplateAndLike = (templateViewInfo) => {
    return {
        filePDF: templateViewInfo.file_pdf,
        fileShareState: templateViewInfo.file_share_state || "",
        fileLikeStatus: templateViewInfo.like_status,
    };
};