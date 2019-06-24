const webpackDev = require('./webpack/webpack.config.dev');
const webpackProd = require('./webpack/webpack.config.prod');
const babel = require('./babel/babel.config');

function getConfigs(success) {
  const obj = {
    babel,
    'webpackProduction': webpackProd(),
    'webpackDevelop': webpackDev(),
  };

  success(obj);
}

module.exports = getConfigs;
