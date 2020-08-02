const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, //space 없애주는 역할
    unique: 1 //true
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  // 토큰 유효 기간
  tokenExp: {
    type: Number
  }
})

// 인자로는 (이 모델의 이름, 스키마)
const User = mongoose.model('User', userSchema)

// 다른 파일에서도 쓸 수 있도록
module.exports = { User }