// src/dtos/popular.template.dto.js
export class PopularTemplateDTO {
    static toResponse(template) {
        return {
            id: template.id,
            title: template.title,
            thumbnail: template.thumbnail,
            likeCount: Number(template.like_count),
            author: {
                name: template.user_name,
                photo: template.user_photo
            },
            createdAt: template.created_at
        };
    }
}