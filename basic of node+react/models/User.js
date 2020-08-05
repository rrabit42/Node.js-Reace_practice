const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10   // salt가 몇글자 인지. 즉 10자리인 salt
const jwt = require('jsonwebtoken');

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
    default: 0 // 0 -> 일반유저, 0이 아니면 관리자
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

// comparePassword 라는 이름의 함수는 pw와 cb을 인자로 가진다.
userSchema.methods.comparePassword = function(plainPassword, cb) {
  // plainPassword와 암호화된 비밀번호 hash값 체크
  // hash는 복호화가 불가능하기 때문에 plainPassword도 암호화 후 비교
  bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    if(err) return cb(err)
    cb(null, isMatch) //에러 없고, isMatch에 true가 들어 있음
  })
}

// gegnerateToken 이름의 함수는 cb만 인자로 가진다.
// 걍 함수 선언법이라고 생각해!
userSchema.methods.generateToken = function(cb) {
  var user = this;

  //jsonwebtoken을 이용해서 token을 생성하기
  //_id: mongodb collection에서 확인해봐, 그리고 sign에 인자에는 String으로 들어가야해서 변환해줌!
  /*
    이 함수는
    user._id + 'secretToken' = token을 발급한다.
    그리고 나중에 secretToken을 넣으면 user._id를 알 수 있게 됨!
    따라서 secretToken은 기억해줘야함!
  */
  var token = jwt.sign(user._id.toHexString(), 'secretToken')

  user.token = token
  user.save(function(err, user) {
    if(err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken = function(token, cb) {
  var user = this;

  // 토큰을 decode 한다
  jwt.verify(token, 'secretToken', function(err, decoded){
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ //mongodb method
      "_id" : decoded,
      "token": token,
    }, function(err, user){
      if(err) return cb(err);
      return cb(null, user)
    })
  });
}

// 인자로는 (이 모델의 이름, 스키마)
const User = mongoose.model('User', userSchema)

// 다른 파일에서도 쓸 수 있도록
module.exports = { User }