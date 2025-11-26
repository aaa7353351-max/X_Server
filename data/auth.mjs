import MongoDB from "mongodb";
import { useVirtualId } from "../db/database.mjs";
import mongoose from "mongoose";

// versionKey: Mongoose가 문서를 저장할 때 자동으로 추가하는 _v라는 필드를 설정
const userSchema = new mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
);
useVirtualId(userSchema); // id도 쓸수있음
const User = mongoose.model("user", userSchema); //자동으로 복수로 s로 달아주기때문에 변수명 단수로

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

export async function findByUserid(userid) {
  return User.findOne({ userid }); //몽구스 문법임
}

export async function findById(id) {
  return User.findById(id);
}
