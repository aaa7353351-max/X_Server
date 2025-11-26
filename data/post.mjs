import { useVirtualId } from "../db/database.mjs";
import * as UserRepository from "./auth.mjs";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    text: { type: String, require: true },
    userIdx: { type: String, require: true },
    name: { type: String, require: true },
    userid: { type: String, require: true },
    url: String,
  },
  { timestamps: true } //타임스탬프는 왜 안에 안넣고 빼두는지 ???
);
useVirtualId(postSchema);
const Post = mongoose.model("Post", postSchema);

// 모든 포스트를 리턴
export async function getAll() {
  return Post.find().sort({ createdAt: -1 }); //모든포스트를 리턴 ???
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
export async function getAllByUserid(userid) {
  return Post.find({ userid }).sort({ createdAt: -1 });
}

// // 글 번호(id)에 대한 포스트를 리턴
export async function getById(id) {
  return Post.findById(id);
}

// 포스트를 작성
export async function create(text, id) {
  return UserRepository.findById(id).then((user) =>
    new Post({
      text,
      userIdx: user.id,
      name: user.name,
      userid: user.userid,
      url: user.url,
    }).save()
  );
}

// // 포스트를 변경
export async function update(id, text) {
  return Post.findByIdAndUpdate(id, { text }, { returnDocument: "after" });
}

// // 포스트를 삭제
export async function remove(id) {
  return Post.findByIdAndDelete(id);
}

// function mapOptionalPost(post) {
//   return post ? { ...post, id: post._id.toString() } : post;
// }
