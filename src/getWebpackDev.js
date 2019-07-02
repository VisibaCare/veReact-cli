function getWebpackDev() {
  const webpackDev = require('./webpack/webpack.config.dev')();
  const middleware = require('./middleware');

  const modified = middleware({ webpackDev });

  return modified.webpackDev;
}

module.exports = getWebpackDev;
