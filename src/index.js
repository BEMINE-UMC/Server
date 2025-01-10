import dotenv from "dotenv";
import express from 'express'
import cors from 'cors';
import swaggerUiExpress from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";

import { getPopularTemplates } from './controllers/popular.template.controller.js';

import { handleOtherPost } from "./controllers/post.controller.js";
import {handlerGetUserHistory, handlerPatchMyProfile} from "./controllers/user.controller.js";
import {handlerGetRecentPost, handlerGetScrapPost, handlerPostLikeCreate} from "./controllers/post.controller.js";
import {handlerGetTempleteView} from "./controllers/template.controller.js";
import { handleViewAllPosts } from "./controllers/post.controller.js";
import { handleFullTemplateLoad, handleTemplateDelete, handleTemplateCreateAndModify } from "./controllers/template.controller.js";
import { handleViewTemplate } from "./controllers/template-view.controller.js";
import { handleGetPostLiked, handleSignUp, handleLogin, handlecheckEmail } from "./controllers/post.controller.js";

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
    };

    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    res.json(result ? result.data : null);
});


app.get('/', (req, res) => {
    {
        res.send("hello world!")
    }
});



//메인페이지 좋아요 많은순 템플릿 출력
app.get('/api/templates/popular',getPopularTemplates);

// 게시물 전체 조회 API
app.get('/posts', handleViewAllPosts);

// 템플릿 전체 불러오기 API (템플릿 올리기 화면)
app.get('/templates/:templateId', handleFullTemplateLoad);

// 템플릿 삭제 API
app.delete('/templates/:templateId', handleTemplateDelete);

// 템플릿 수정/생성 API
app.put('/templates/:templateId', handleTemplateCreateAndModify);

//게시물 좋아요 누르기
app.post('/api/v1/users/:userId/posts/:postId/likes', handlerPostLikeCreate);

//사용자가 작성한 다른 게시물 불러오기 API
app.get('/users/:userId/posts', handleOtherPost);

// 사용자 연혁 조회 API
app.get('/api/v1/users/:userId/myHistory', handlerGetUserHistory);

// 최근 본 게시물 조회 API
app.get('/api/v1/users/:userId/myPage/recentPost', handlerGetRecentPost)

// 북마크한 게시물 조회 API
app.get('/api/v1/users/:userId/myPage/bookMark', handlerGetScrapPost)

// 프로필 사진 수정하기 API
app.patch('/api/v1/users/:userId/profile/modify', handlerPatchMyProfile)

// PPT 파일 불러오기 API
app.get('/api/v1/template/view', handlerGetTempleteView)

// 템플릿 단일 조회 API
app.get('/templates/:templateId/view', handleViewTemplate);

//좋아요 누른 게시물 조회 API
app.get('/users/:userId/posts/:postId/like', handleGetPostLiked);

//회원가입 API
app.get('/users/signup', handleSignUp);

//로그인 API
app.get('/users/login', handleLogin);

//이메일 인증 API
app.get('/users/checkEmail', handlecheckEmail);

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