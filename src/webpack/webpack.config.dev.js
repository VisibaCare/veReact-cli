const webpack = require('webpack');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { getPaths } = require('../paths');
const dogOrCat = require('../dogOrCat');
const { getGlobalState } = require('../globalState');
const address = require('address');

const getConfig = () => {
  const base = require('./webpack.config.base');
  const { browserSync, browserSyncPort } = getGlobalState();
  const paths = getPaths();

  const reactUtils = [];

  const hostedUrl = `http://localhost:${process.env.PORT}/`;

  try {
    // If this fails, continue as normal.
    require.resolve('react');

    // Adds react-hot-loader's Webpack loader.
    base.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      include: /node_modules/,
      use: ['react-hot-loader/webpack'],
    });

    reactUtils.push(require.resolve('react-hot-loader/patch'), require.resolve('react-dev-utils/webpackHotDevClient'));
  } finally {

    const config = {
      ...base,
      mode: 'development',
      entry: {
        app: [
          ...reactUtils,
          paths.appIndex,
        ],
      },
      output: {
        path: paths.publicPath,
        publicPath: browserSync ? `http://${address.ip()}:${browserSyncPort}` : hostedUrl,
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
              Ready on ${hostedUrl} ${dogOrCat()}
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
          proxy: hostedUrl,
          notify: false,
          open: false,
        }, {
            reload: false,
          }),
      );
    }

    return config;
  }
};

module.exports = getConfig;
