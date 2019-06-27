const { getPaths } = require('../paths');

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
    ...require('../getBabelConfig')(),
    cacheDirectory: true,
  },
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
          babelLoader,
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
  node: { // TODO: Remove this when there's support for extending configs.
    fs: 'empty',
  },
};
