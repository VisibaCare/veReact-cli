const webpack = require('webpack');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { getPaths } = require('../paths');
const { publicPath, buildConfig } = require('../globalState').getGlobalState();

const getConfig = () => {
  const base = require('./webpack.config.base');
  const paths = getPaths();

  return {
    ...base,
    mode: 'production',
    devtool: 'sourcemap',
    entry: {
      app: paths.appIndex,
    },
    stats: {
      all: true,
      modules: true,
      maxModules: 15,
      chunks: true,
      errors: true,
      warnings: true,
      moduleTrace: true,
      errorDetails: true,
    },
    output: {
      filename: 'scripts/[name]-[hash].js',
      chunkFilename: 'scripts/[name]-[chunkhash].chunk.js',
      path: paths.appBuild,
      publicPath: publicPath,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: true,
          terserOptions: {
            ecma: 7,
            toplevel: true,
            sourceMap: true,
          }
        }),
      ],
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 300,
        minChunks: 2,
        maxInitialRequests: Infinity,
        cacheGroups: {
          vendors: {
            reuseExistingChunk: true,
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
        BUILD_CONFIG: buildConfig || 'production',
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CopyWebpackPlugin([
        {
          from: paths.appPublic,
          to: '.',
          ignore: ['index.html'],
        },
      ]),
      new HtmlWebpackPLugin({
        template: paths.appHtml,
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    ],
  };
};

module.exports = getConfig;
