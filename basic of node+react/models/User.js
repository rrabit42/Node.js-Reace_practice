const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10   // salt가 몇글자 인지. 즉 10자리인 salt

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

// mongoose method
// user.save 전(pre)에 function을 한다!
// 그리고 next()를 통해 user.save()로 넘어가도록!
userSchema.pre('save', function(next){
  var user = this;

  // 비밀번호를 바꾸고자 할때만 해당 함수가 실행돼서 새 pw 발급
  if(user.isModified('password')){
    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err)
      // 여기서 첫번째 인자로 myPlaintextPassword를 넣어줘야하는데 이건 우리의 original 비밀번호
      // 즉 DB에서 user model에 정의한 password column을 가져오면 됨!
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err) return next(err)

        // Store hash in your password DB
        user.password = hash
        next()
      });
    });
  } else {
    next()
  }
});

// 인자로는 (이 모델의 이름, 스키마)
const User = mongoose.model('User', userSchema)

// 다른 파일에서도 쓸 수 있도록
module.exports = { User }