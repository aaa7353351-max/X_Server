import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.mjs";
import { get } from "../data/auth.mjs";

const AUTH_ERROR = { message: "인증오류입니다" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);

  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    console.log("헤더 에러");
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(" ")[1];
  // [0]번은 Bearer [1]번은 실제 토큰
  console.log("토큰분리성공", token);

  next();
};
