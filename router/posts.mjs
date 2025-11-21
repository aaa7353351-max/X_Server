import express from "express";
import * as postController from "../controller/post.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();
const validatorPost = [
  body("text").trim().isLength({ min: 4 }).withMessage("최소 4자이상 입력"),
  validate,
];
// 벨리데이트포스트 에 대한 ??

// 전체 포스트 가져오기
// 특정 아이디에 대한 포스트 가져오기

// http:/127.0.0.1:8000/post
// http:/127.0.0.1:8000/post?userid=xxx
router.get("/", postController.getPosts);
// 콜백써서깔끔해짐

// 특정 글번호에 대한 포스트 가져오기
// http:/127.0.0.1:8000/post/:id
router.get("/:id", postController.getPost);
// 포스트 쓰기
// http:/127.0.0.1:8000/post/
router.post("/", validatorPost, postController.createPost);
// 포스트 수정하기
// http:/127.0.0.1:8000/post/:id
router.put("/:id", validatorPost, postController.updatePost);

// 포스트 삭제하기
// http:/127.0.0.1:8000/post/id
router.delete("/:id", postController.deletePost);
export default router;
