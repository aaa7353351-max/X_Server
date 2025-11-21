import express from "express";
import * as authController from "../controller/auth.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();
const validatorLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage(" 최소 4자이상 입력")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("특수문자는 사용불가 "),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage(" 최소 4자이상 입력"),
  validate,
];
// (/^[a-zA-Z0-9]+$/) ??
// 회원가입
const validaterSignup = [
  ...validatorLogin,
  body("name").trim().notEmpty().withMessage("이름은 최소 2자이상 입력"),
  body("email").trim().isEmail().withMessage("이메일형식으로 입력"),
  validate,
];

router.post("/signup", validaterSignup, authController.signup);

// 로그인
router.post("/login", validatorLogin, authController.login);

// 로그인 유지

export default router;
// 디폴트 설정 이유 "?"
