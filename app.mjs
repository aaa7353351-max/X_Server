import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";

/*
전체 구조 설계:
*app.mjs (서버 시작점)

*router/ (URL 경로 정의)
  ㄴauth.mjs (회원가입/로그인 경로)
  ㄴposts.mjs (게시글 경로)

*middleware/ (중간 처리 단계)
  ㄴauth.mjs (토큰 검증)
  ㄴvalidator.mjs (입력값 검증)

*controller/ (실제 로직 처리)
  ㄴauth.mjs (회원 관련 처리)
  ㄴpost.mjs (게시글 관련 처리)

*Data/ (데이터 저장/조회)
  ㄴauth.mjs (회원 데이터)
  ㄴpost.mjs (게시글 데이터)

*config/ (설정 파일 관리)

*/
const app = express();

app.use(express.json());

app.use("/post", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(config.host.port);
