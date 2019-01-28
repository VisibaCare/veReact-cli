const { setPaths, getPaths } = require('../paths');
setPaths();

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack/webpack.config.dev');
const dogOrCat = require('../dogOrCat');
const { getGlobalState } = require('../globalState');

const paths = getPaths();
const { name } = getGlobalState();

process.env.NODE_ENV = 'development';

const options = {
  disableHostCheck: true,
  compress: true,
  clientLogLevel: 'none',
  contentBase: paths.appPublic,
  hot: true,
  quiet: true,
  publicPath: config.appPublic,
  port: process.env.PORT,
  host: '0.0.0.0',
  overlay: false,
  historyApiFallback: {
    disableDotRule: true,
  },
};

const server = new WebpackDevServer(webpack(config), options);

server.listen(process.env.PORT, 'localhost', (error) => {
  if (error) {
    console.error(error);

    return;
  }

  console.log(`Starting ${chalk.green(name)} at: http://localhost:${process.env.PORT} ${dogOrCat()}`);
});