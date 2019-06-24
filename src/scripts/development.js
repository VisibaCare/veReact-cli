const { setPaths, getPaths } = require('../paths');
setPaths();

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getConfigs = require('../getConfigs');
const dogOrCat = require('../dogOrCat');
const { getGlobalState } = require('../globalState');

const paths = getPaths();
const { name } = getGlobalState();

getConfigs(({ webpackDevelop }) => {
  process.env.NODE_ENV = 'development';
  
  const devServerOptions = {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    hot: true,
    quiet: true,
    publicPath: webpackDevelop.appPublic,
    port: process.env.PORT,
    host: '0.0.0.0',
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
    },
  };
  
  const server = new WebpackDevServer(webpack(webpackDevelop), devServerOptions);
  
  server.listen(process.env.PORT, 'localhost', (error) => {
    if (error) {
      throw new Error(error);
    }
  
    console.log(`Starting ${chalk.green(name)} at: http://localhost:${process.env.PORT} ${dogOrCat()}`);
  });
});
