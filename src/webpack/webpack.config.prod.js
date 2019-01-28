const webpack = require('webpack');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const CleanWebpackPLugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const base = require('./webpack.config.base');
const { getPaths } = require('../paths');

const paths = getPaths();

module.exports = {
  ...base,
  mode: 'production',
  
  devtool: 'sourcemap',
  entry: {
    app: paths.appIndex,
  },
  stats: {
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true
  },
  output: {
    filename: 'scripts/[name]-[hash].js',
    chunkFilename: 'scripts/[name]-[hash].chunk.js',
    path: paths.appBuild,
    publicPath: paths.publicPath,
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
        chunks: 'async',
        minSize: 150,
        minChunks: 10,
        name: true,
        cacheGroups: {
            default: {
                minChunks: 1,
                priority: -20,
                reuseExistingChunk: true,
            },
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                enforce: true,
                chunks: 'all',
                reuseExistingChunk: true,
            },
        },
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new CleanWebpackPLugin([paths.appBuild], { root: `${process.cwd()}/..` }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      {
        from: paths.appPublic,
        to: '.',
        ignore: ['index.html'],
      },
    ]),
    new OfflinePlugin({
      appShell: '/',
      version: '[hash]',
      AppCache: false,
      updateStrategy: 'changed',
      responseStrategy: 'cache-first',
      autoUpdate: 1000 * 60 * 2,
      ServiceWorker: {
        minify: true,
        events: true,
        navigateFallbackURL: '/',
      },
      caches: {
        main: [':rest:'],
        optional: ['scripts/*.chunk.js', 'assets/*.**', 'icons/*.**', 'treeData/*.**']
      },
    }),
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
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
};