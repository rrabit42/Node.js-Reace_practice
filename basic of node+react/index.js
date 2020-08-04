const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const { User } = require("./models/User");

const mongoose = require('mongoose'); //mongoose: 몽고db를 편하게 사용할 수 있게 해주는 툴, npm install mongoose --save
const { json } = require('body-parser');

// application/x-www-form-urlencoded 타입 데이터 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true}));
// application/json 타입 데이터 분석해서 가져옴
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// route
app.get('/', (req, res) => res.send('Hello World!'))

// 회원가입 route
app.post('/register', (req, res) => {

  //회원 가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  // bodyparser로 인해 req.body에 json 형식 등으로 데이터가 존재할 수 있게 되는 것
  const user = new User(req.body)

  // mongodb의 method
  user.save((err, userInfo) => {
    // 에러가 있으면 클라이언트에게 json 형식으로 전달, 에러메세지와 함께
    if(err) return res.json({
      success: false,
      err
    })
    return res.status(200).json({
      suceess: true
    })
  })
})

app.post('/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  // mongodb 제공 method
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    // comparePassword 함수의 인자로는 pw과 cb(callback)함수
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        })

      // 비밀번호까지 맞다면 토큰을 생성하기
      // generateToken 함수의 인자로 cb뿐
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        
        // 토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지, 세션...
        // 우리는 쿠키에다 할거임!
        // 이름이 x_auth란 쿠키가 생성됨
        res.cookie("x_auth", user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id
        })
      })
    })
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))