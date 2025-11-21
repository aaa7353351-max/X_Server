import { validationResult } from "express-validator";
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};
// ??
// [
// errors: {
//     msg = "최소 4자이상 입력";
// }
// ]

// 검증 실패 시 errors 객체 내용:
// errors = {
//   isEmpty: () => false,
//   array: () => [
//     {
//       type: 'field',
//       value: '안녕',
//       msg: '최소 4자이상 입력',  // ← withMessage()로 설정한 값
//       path: 'text',
//       location: 'body'
//     }
//   ]
// }
