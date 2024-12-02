const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/admin',
    createProxyMiddleware({
      target: 'http://localhost:50012',
      changeOrigin: true,
    })
  );
};
