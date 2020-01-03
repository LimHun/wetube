import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

// Helmet을 이용하면 HTTP 헤더를 적절히 설정하여 몇 가지 잘 알려진 웹 취약성으로부터 앱을 보호할 수 있습니다.
app.use(helmet());

// Node.js 에서 사용하는 템플릿 엔진 Pug (구 Jade)
/**
 * pug는 코드를 간소화시켰고, 컴파일한 후에 html문서를 렌더링하는 형식이라 생산성이 높아지기 때문에 새로 문법을 익히는데 시간은 조금 걸리지만 장기적으로 봤을 때 이득이다.
 */
app.set("view engine", "pug");

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
// 요청된 쿠키를 쉽게 추출할 수 있도록 해주는 미들웨어 cookieParser
app.use(cookieParser());

//body-parser는 JSON과 URL-encoded 형식의 본문 외에도 Raw, Text형식의 본문을 추가로 해석할 수 있다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 로그 기록을 남기는 morgan 모듈
app.use(morgan("dev"));

// 웹페이지 쿠기를 사용할 수 있도록 세팅한다.
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        stroe: new CokieStore({ mongooseConnection: mongoose.connection })
    })
);

// passport 초기화
app.use(passport.initialize());

// passport 스스로 쿠키를 들여다 봐서 그 쿠키 정보에 해당하는 사용자를 츶음
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
