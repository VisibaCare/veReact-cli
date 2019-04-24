const { setPaths } = require('../paths');
setPaths();

const webpack = require('webpack');
const chalk = require('chalk');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getGlobalState } = require('../globalState');

const { name, analyzer } = getGlobalState();

process.env.NODE_ENV = 'production';

const config = require('../webpack/webpack.config.prod');

if (analyzer) {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  );
}

webpack(config, (error) => {
  if (error) {
    console.error(error);

    return;
  }

  console.log(`Building ${chalk.green(name)} ...`);
});