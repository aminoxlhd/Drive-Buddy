const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/students',
    createProxyMiddleware({
      target: 'http://localhost:5000',  // Your backend server address
      changeOrigin: true,
    })
  );
};
