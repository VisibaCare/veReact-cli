const webpack = require('webpack');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const base = require('./webpack.config.base');
const { getPaths } = require('../paths');
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
const { publicPath } = require('../globalState').getGlobalState();

const paths = getPaths();

const prePackConfiguration = {};

module.exports = {
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
    errorDetails: true
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
    new OfflinePlugin({
      appShell: '/',
      version: '[hash]',
      AppCache: {
        events: true,
        publicPath: '/appcache',
        FALLBACK: {
          '/': '/'
        },
      },
      externals: [
        '/'
      ],
      updateStrategy: 'changed',
      responseStrategy: 'cache-first',
      autoUpdate: 1000 * 60 * 2,
      ServiceWorker: {
        minify: true,
        events: true,
        navigateFallbackURL: '/',
        publicPath: '/sw.js'
      },
      caches: {
        main: [
          'index.html',
          '/',
          ':rest:',
        ],
        additional: [
          ':externals:',
        ],
        optional: [
          'scripts/*.chunk.js',
          'assets/*.**',
          'icons/*.**',
        ]
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
};
