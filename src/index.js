import dotenv from "dotenv";
import express from 'express'
import cors from 'cors';
import swaggerUiExpress from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";

import {handlerUserHistory} from "./controllers/user.controller.js";

import { handlerPostLikeCreate, handleViewAllPosts } from "./controllers/post.controller.js";
import { handleFullTemplateLoad, handleTemplateDelete, handleTemplateCreateAndModify } from "./controllers/template.controller.js";
import { handleViewTemplate } from "./controllers/template-view.controller.js";


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

// 사용자 연혁 조회 API
app.get('/users/:userId/myHistory', handlerUserHistory);

// 템플릿 단일 조회 API
app.get('/templates/:templateId/view', handleViewTemplate);

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