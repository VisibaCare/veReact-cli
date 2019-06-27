const babelConfig = require('./src/babel/babel.config');

module.exports = {
  babelConfig,
  getBabelConfig: require('./src/getBabelConfig'),
  createPlugin: require('./src/createPlugin'),
};
