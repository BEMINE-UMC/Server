// src/services/popular.template.service.js
import { findPopularTemplates } from '../repositories/popular.template.repository.js';
import { PopularTemplateDTO } from '../dtos/popular.template.dto.js';

export const getPopularTemplatesData = async (limit) => {
    // 인기 템플릿 데이터 조회 및 DTO 변환
    const templates = await findPopularTemplates(limit);
    return templates.map(template => PopularTemplateDTO.toResponse(template));
};