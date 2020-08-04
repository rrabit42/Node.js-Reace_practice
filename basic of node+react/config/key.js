/*
환경 변수 process.env.NODE_ENV 값은
Local 환경에서 'development'
Deploy(배포)한 후에는 'production'으로 나옴
*/
if(process.env.Node_ENV === 'production'){
  module.exports = require('./prod');
} else{
  module.exports = require('./dev');
}