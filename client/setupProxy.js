const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.freetogame.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
