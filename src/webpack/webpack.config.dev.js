const webpack = require('webpack');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const { getPaths } = require('../paths');
const base = require('./webpack.config.base');
const dogOrCat = require('../dogOrCat');

const paths = getPaths();

const { rules, ...rest } = base;

// Adds react-hot-loader's Webpack loader.
rules.push({
  test: /\.(js|jsx|ts|tsx)$/,
  include: /node_modules/,
  use: ['react-hot-loader/webpack'],
});

const test = {
  ...rest,
  rules,
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
  devtool: 'source-map',
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
}

module.exports = test;
