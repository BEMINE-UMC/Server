// src/controllers/popular.template.controller.js
import { getPopularTemplatesData } from '../services/popular.template.service.js';

export const getPopularTemplates = async (req, res, next) => {
    try {
        // #swagger.tags = ['Template']
        // #swagger.summary = '메인페이지 인기 템플릿 목록 조회'
        // #swagger.description = '메인페이지 상단에 노출될 인기 템플릿을 조회합니다. 좋아요가 많은 순으로 정렬되며, 좋아요가 없는 경우 최신 등록순으로 정렬됩니다.'
        /* #swagger.parameters['limit'] = {
            in: 'query',
            description: '조회할 템플릿 수',
            default: 3,
            type: 'integer'
        } */
        /* #swagger.responses[200] = {
            description: '인기 템플릿 조회 성공',
            schema: {
                resultType: "SUCCESS",
                error: null,
                success: [{
                    id: 1,
                    title: "콘텐츠 마케팅 템플릿",
                    thumbnail: "template1.jpg",
                    likeCount: 150,
                    author: {
                        name: "김마케터",
                        photo: "profile.jpg"
                    },
                    createdAt: "2024-01-15T06:30:00.000Z"
                }]
            }
        } */
        /* #swagger.responses[500] = {
            description: '서버 에러',
            schema: {
                resultType: "FAIL",
                error: {
                    errorCode: "INTERNAL_SERVER_ERROR",
                    reason: "서버 에러가 발생했습니다.",
                    data: null
                },
                success: null
            }
        } */
        
        const limit = parseInt(req.query.limit) || 3;
        const templates = await getPopularTemplatesData(limit);
        res.success(templates);
    } catch (error) {
        next(error);
    }
};