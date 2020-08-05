const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳

  // 1. 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth // x_auth라는 이름으로 쿠키 만들었으니까

  // 2. 토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({
      isAuth: false,
      error: true
    })
    // 라우터 콜백에서 req, res를 인자로 가지니까
    // req에 token과 user를 넣어줘서 사용할 수 있게 하려고!
    req.token= token
    req.user = user;
    next() // 미들웨어에서 다음으로 넘어갈 수 있게!
  })

  // 3-1. 유저가 있으면 인증 Okay
  
  // 3-2. 유저가 없으면 인증 No
}

module.exports = { auth };