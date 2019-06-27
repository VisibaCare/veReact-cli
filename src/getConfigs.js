function getConfigs(success) {
  const obj = {
    babel: require('./getBabelConfig')(),
    'webpackProduction': require('./getWebpackProd')(),
    'webpackDevelop': require('./getWebpackDev')(),
  };

  success(obj);
}

module.exports = getConfigs;
