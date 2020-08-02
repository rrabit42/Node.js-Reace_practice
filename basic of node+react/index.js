const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

const mongoose = require('mongoose') //mongoose: 몽고db를 편하게 사용할 수 있게 해주는 툴, npm install mongoose --save

// application/x-www-form-urlencoded 타입 데이터 분석해서 가져옴
app.use(bodyParser.urlencoded({extended:true}));
// application/json 타입 데이터 분석해서 가져옴
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://<id>:<password>@basic.sbk7x.mongodb.net/<dbname>?retryWrites=true&w=majority', {
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))