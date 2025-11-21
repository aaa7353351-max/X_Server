import * as postRepository from "../data/post.mjs";

//모든 포스트를 가져오는 함수
export async function getPosts(req, res, next) {
  const userid = req.query.userid;
  const data = await (userid
    ? postRepository.getAllByUserid(userid)
    : postRepository.getAll());
  res.status(200).json(data);
  // ??
}

// 하나의 포스트를 가져오는 합ㅁ수
export async function getPost(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getByid(id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json(post);
  }
}

// 포스트를 작성하는 함수
export async function createPost(req, res, next) {
  const { userid, name, text } = req.body;
  const post = await postRepository.create(userid, name, text);
  res.status(201).json(post);
}

export async function updatePost(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const post = await postRepository.update(id.text);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "게시글 없음" });
  }
}

// 포스트를 변경하는함수
export async function deletePost(req, res, next) {
  const id = req.params.id;
  await postRepository.remove(id);
  res.sendStatus(204);
}
// 포스트 삭제하는 함수
