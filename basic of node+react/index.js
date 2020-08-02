const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose') //mongoose: 몽고db를 편하게 사용할 수 있게 해주는 툴, npm install mongoose --save
mongoose.connect('mongodb+srv://<id>:<password>@basic.sbk7x.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))