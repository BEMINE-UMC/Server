import dotenv from "dotenv";
import express from 'express'
import cors from 'cors';
import swaggerUiExpress from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";
import { handleOtherPost, handlerGetUserPost, handlerPostLike, handlerPostScrap, handlerPostSearch,getPostDetail ,handlePostWrite, handlePostDelete } from "./controllers/post.controller.js";
import {handlerGetUserHistory, handlerPatchMyProfile} from "./controllers/user.controller.js";
import {handlerGetRecentPost, handlerGetScrapPost, } from "./controllers/post.controller.js";
import {handlerCreateTemplateLike, handlerGetTempleteView ,handlePopularTemplates } from "./controllers/template.controller.js";
import { handleViewAllPosts } from "./controllers/post.controller.js";
import { handleDetailTemplateInfoLoad, handleTemplateDelete, handleTemplateCreateAndModify, handleGetTemplateFile } from "./controllers/template.controller.js";
import { handleGetPostLiked } from "./controllers/post.controller.js";
import { handleSignUp, handleLogin, handlecheckEmail, handleTokenRefresh, handlesendEmail } from "./controllers/auth.controller.js";
import { authenticateJWT } from "./auth.middleware.js";
import { imageUploader } from "../middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

/*****************공통 응답을 사용할 수 있는 헬퍼 함수 등록*********************/
app.use((req, res, next) => {
    res.success = (success) => {
        return res.json({
            resultType: "SUCCESS",
            error: null,
            success: success,
        });
    };

    res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
        return res.json({
            resultType: "FAIL",
            error: { errorCode, reason, data },
            success: null,
        });
    };

    next();
});
/*****************공통 응답을 사용할 수 있는 헬퍼 함수 등록*********************/


app.use(cors());
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(
    "/docs",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(
        {},
        {
            swaggerOptions: {
                url: "/openapi.json",
            },
        }
    )
);
app.get("/openapi.json", async (req, res, next) => {
    // #swagger.ignore = true
    const options = {
        openapi: "3.0.0",
        disableLogs: true,
        writeOutputFile: false,
        autoHeaders: false
    };
    const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
    const routes = ["./src/index.js"];

    // 요청의 host와 protocol을 동적으로 가져오기
    const protocol = req.protocol; // http 또는 https
    const host = req.get("host");

    const doc = {
        info: {
            title: "BEMINE",
            description: "BEMINE 프로젝트",
        },
        host: `${protocol}://${host}`,
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT", // JWT 형식 명시 (선택 사항)
                },
            },
        },
        security: [
            {
                bearerAuth: [], // 모든 API에 기본적으로 인증 적용
            },
        ],
    };

    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    res.json(result ? result.data : null);
});


app.get('/', (req, res) => {
    // #swagger.ignore = true
    {
        res.send("hello world!")
    }
});

//메인페이지 좋아요 많은순 템플릿 출력
app.get('/templates/popular',handlePopularTemplates);

// 게시물 전체 조회 API
app.get('/posts', handleViewAllPosts);

//게시물 좋아요 누르기 API
app.post('/posts/:postId/likes', authenticateJWT, handlerPostLike);

//게시물 스크랩 누르기 API
app.post('/posts/:postId/scrapts',authenticateJWT, handlerPostScrap);

//게시물 검색 API
app.get('/posts/search',handlerPostSearch);

//인증번호 발송 API
app.post('/users/sendEmail', handlesendEmail);

//인증번호 검증 API
app.post('/users/checkEmail', handlecheckEmail);

//회원가입 API
app.post('/users/signup', handleSignUp);

//로그인 API
app.post('/users/login', handleLogin);

// Access Token 재발급 API (Refresh Token 활용)
app.post('/users/refresh', handleTokenRefresh);

// 사용자 연혁 조회 API
app.get('/myPage/history',authenticateJWT, handlerGetUserHistory);

//사용자가 작성한 다른 게시물 불러오기 API
app.get('/users/posts/other', authenticateJWT, handleOtherPost);

// 템플릿 상세 정보 조회 API (템플릿 올리기 화면)
app.get('/templates/:templateId', handleDetailTemplateInfoLoad);

//작성한 게시물 조회 API
app.get('/mypage/posts',authenticateJWT, handlerGetUserPost)

// 최근 본 게시물 조회 API
app.get('/myPage/recentPost',authenticateJWT, handlerGetRecentPost)

//좋아요 누른 게시물 조회 API
app.get('/myPage/likePost', authenticateJWT, handleGetPostLiked);

// 북마크한 게시물 조회 API
app.get('/myPage/bookMark', authenticateJWT, handlerGetScrapPost)

// 프로필 사진 수정하기 API
app.patch('/profile/modify', imageUploader.single('photo'), authenticateJWT, handlerPatchMyProfile)

//템플릿 좋아요 누르기 API
app.post('/api/v1/users/:userId/templates/:templateId/like',handlerCreateTemplateLike)

// 템플릿 삭제 API
app.patch('/templates/:templateId', handleTemplateDelete);

// 템플릿 수정/생성 API
app.put('/templates/:templateId', handleTemplateCreateAndModify);

// 템플릿 파일 조회 API
app.get('/templates/:templateId/view', authenticateJWT, handleGetTemplateFile);




//게시글 작성 API 
app.post('/posts/write', authenticateJWT, handlePostWrite );

//게시글에 이미지 첨부 시 이미지 업로드 API 
app.post('/posts/image/uploads', authenticateJWT, imageUploader.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'File upload failed' });
    }
    res.status(200).json({ imageUrl: req.file.location });
});
//게시글 이미지 업로드 API (분리)

// 게시글 삭제
app.patch('/posts/:postId', authenticateJWT,handlePostDelete);

//게시글 상세조회
app.get('/posts/:postId',authenticateJWT,getPostDetail);

//게시글 상세 조회회
/****************전역 오류를 처리하기 위한 미들웨어*******************/
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.log(err);
    res.status(err.statusCode || 500).error({
        errorCode: err.errorCode || "unknown",
        reason: err.reson || err.message || null,
        data: err.data || null,
    });
});
/****************전역 오류를 처리하기 위한 미들웨어*******************/


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})