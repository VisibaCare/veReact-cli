const { getPaths } = require('../paths');
const babelConfig = require('../babel/babel.config');

const paths = getPaths();

const threadLoader = {
  loader: 'thread-loader',
  options: {
    workers: require('os').cpus().length - 1,
  },
};

const babelLoader = {
  loader: 'babel-loader',
  options: {
    ...babelConfig,
    cacheDirectory: true,
  }
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: paths.appSrc,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          threadLoader,
          babelLoader
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  performance: {
    hints: false,
  },
};