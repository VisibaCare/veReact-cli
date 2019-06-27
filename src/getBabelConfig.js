function getBabelConfig() {
  const babelRc = require('./babel/babel.config')();
  const middleware = require('./middleware');

  const modified = middleware({ babelRc });

  return modified.babelRc;
}

module.exports = getBabelConfig;
