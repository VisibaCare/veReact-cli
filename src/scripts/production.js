const { setPaths } = require('../paths');
setPaths();

const webpack = require('webpack');
const chalk = require('chalk');
const { getGlobalState } = require('../globalState');

const { name } = getGlobalState();

process.env.NODE_ENV = 'production';

webpack(require('../webpack/webpack.config.prod'), (error) => {
  if (error) {
    console.error(error);

    return;
  }

  console.log(`Building ${chalk.green(name)} ...`);
});