// src/controllers/portfolio.post.controller.js
export const getPortfolioPostDetail = async (req, res, next) => {
    try {
        // #swagger.tags = ['Get']
        // #swagger.summary = '포트폴리오 게시글 상세 조회'
        // #swagger.description = '게시글의 상세 정보, 작성자 정보, 작성자 연혁, 그리고 작성자의 다른 게시글을 함께 조회합니다.'
        /* #swagger.parameters['postId'] = {
            in: 'path',
            description: '조회할 게시글 ID',
            required: true,
            type: 'integer'
        } */
        /* #swagger.responses[200] = {
            description: '게시글 상세 조회 성공',
            schema: {
                resultType: "SUCCESS",
                error: null,
                success: {
                    id: 1,
                    title: "효과적인 콘텐츠 제작 전략",
                    body: "콘텐츠 제작의 핵심은...",
                    picture: "content_strategy.jpg",
                    categoryId: 1,
                    createdAt: "2024-01-15T10:00:00.000Z",
                    author: {
                        name: "김마케터",
                        photo: "profile1.jpg",
                        history: {
                            title: "콘텐츠 마케팅 전문가",
                            body: "현) 네이버 마케팅 팀 리드..."
                        }
                    },
                    otherPosts: [{
                        id: 2,
                        title: "2024 콘텐츠 트렌드 분석",
                        picture: "trend_2024.jpg"
                    }]
                }
            }
        } */
        /* #swagger.responses[404] = {
            description: '게시글을 찾을 수 없음',
            schema: {
                resultType: "FAIL",
                error: {
                    errorCode: "POST_NOT_FOUND",
                    reason: "게시글을 찾을 수 없습니다.",
                    data: null
                },
                success: null
            }
        } */
    } catch (error) {
        next(error);
    }
};

export const createPortfolioPost = async (req, res, next) => {
    try {
        // #swagger.tags = ['Post']
        // #swagger.summary = '포트폴리오 게시글 작성'
        // #swagger.description = '새로운 포트폴리오 게시글을 작성합니다. 카테고리 선택은 필수입니다.'
        /* #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        required: ['categoryId', 'title', 'body'],
                        properties: {
                            categoryId: {
                                type: 'integer',
                                description: '카테고리 ID'
                            },
                            title: {
                                type: 'string',
                                description: '게시글 제목'
                            },
                            body: {
                                type: 'string',
                                description: '게시글 내용 (HTML 형식)'
                            }
                        }
                    }
                }
            }
        } */
        /* #swagger.responses[201] = {
            description: '게시글 작성 성공',
            schema: {
                resultType: "SUCCESS",
                error: null,
                success: {
                    id: 1,
                    title: "새로운 게시글",
                    categoryId: 1
                }
            }
        } */
    } catch (error) {
        next(error);
    }
};

export const updatePortfolioPost = async (req, res, next) => {
    try {
        // #swagger.tags = ['Put']
        // #swagger.summary = '포트폴리오 게시글 수정'
        // #swagger.description = '기존 포트폴리오 게시글을 수정합니다. 카테고리 변경이 가능합니다.'
        /* #swagger.parameters['postId'] = {
            in: 'path',
            description: '수정할 게시글 ID',
            required: true,
            type: 'integer'
        } */
        /* #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            categoryId: {
                                type: 'integer',
                                description: '변경할 카테고리 ID'
                            },
                            title: {
                                type: 'string',
                                description: '변경할 게시글 제목'
                            },
                            body: {
                                type: 'string',
                                description: '변경할 게시글 내용 (HTML 형식)'
                            }
                        }
                    }
                }
            }
        } */
        /* #swagger.responses[200] = {
            description: '게시글 수정 성공',
            schema: {
                resultType: "SUCCESS",
                error: null,
                success: {
                    id: 1,
                    message: "게시글이 성공적으로 수정되었습니다."
                }
            }
        } */
    } catch (error) {
        next(error);
    }
};

export const deletePortfolioPost = async (req, res, next) => {
    try {
        // #swagger.tags = ['Delete']
        // #swagger.summary = '포트폴리오 게시글 삭제'
        // #swagger.description = '포트폴리오 게시글을 삭제합니다.'
        /* #swagger.parameters['postId'] = {
            in: 'path',
            description: '삭제할 게시글 ID',
            required: true,
            type: 'integer'
        } */
        /* #swagger.responses[200] = {
            description: '게시글 삭제 성공',
            schema: {
                resultType: "SUCCESS",
                error: null,
                success: {
                    message: "게시글이 성공적으로 삭제되었습니다."
                }
            }
        } */
    } catch (error) {
        next(error);
    }
};