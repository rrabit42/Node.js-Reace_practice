const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', //node 서버 포트가 5000이니까
      changeOrigin: true,
    })
  )
}