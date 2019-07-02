function modifyBabel(config = {}) {
  if (!config['modifyBabelRc']) return undefined;

  return {
    babelRc: {
      modify: config['modifyBabelRc'],
    },
  };
}

function modifyWebpackDev(config = {}) {
  if (!config['modifyWebpackDev']) return undefined;

  return {
    webpackDev: {
      modify: config['modifyWebpackDev'],
    },
  };
}

function modifyWebpackProd(config = {}) {
  if (!config['modifyWebpackProd']) return undefined;

  return {
    webpackProd: {
      modify: config['modifyWebpackProd'],
    },
  };
}

function createPlugin(config) {
  return {
    ...modifyBabel(config),
    ...modifyWebpackDev(config),
    ...modifyWebpackProd(config),
  };
}

module.exports = createPlugin;
