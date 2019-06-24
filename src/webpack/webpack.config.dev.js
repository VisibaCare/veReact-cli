const webpack = require('webpack');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { getPaths } = require('../paths');
const base = require('./webpack.config.base');
const dogOrCat = require('../dogOrCat');
const { getGlobalState } = require('../globalState');

const getConfig = () => {
  const { browserSync, browserSyncPort } = getGlobalState();
  const paths = getPaths();

  // Adds react-hot-loader's Webpack loader.
  base.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    include: /node_modules/,
    use: ['react-hot-loader/webpack'],
  });

  const config = {
    ...base,
    mode: 'development',
    entry: {
      app: [
        require.resolve('react-hot-loader/patch'),
        require.resolve('react-dev-utils/webpackHotDevClient'),
        paths.appIndex,
      ],
    },
    output: {
      path: paths.publicPath,
      publicPath: `http://localhost:${process.env.PORT}/`,
      filename: `bundle-[name].js`
    },
    devtool: 'inline-source-map',
    plugins: [
      new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `
            Ready on http://localhost:${process.env.PORT} ${dogOrCat()}
            `,
          ],
        },
      }),
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new HtmlWebpackPLugin({
        template: paths.appHtml,
        inject: true,
      })
    ],
  };

  if (browserSync) {
    config.plugins.push(
      new BrowserSyncPlugin({
        host: 'localhost',
        port: browserSyncPort,
        proxy: `http://localhost:${process.env.PORT}/`,
        notify: false,
        open: false,
      }, {
          reload: false,
        }),
    );
  }

  return config;
};

module.exports = getConfig;
