function getWebpackDev() {
  const webpackProd = require('./webpack/webpack.config.prod')();
  const middleware = require('./middleware');

  const modified = middleware({ webpackProd });

  return modified.webpackProd;
}

module.exports = getWebpackDev;
