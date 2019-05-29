const { getPaths, resolveApp } = require('../paths');
const paths = getPaths();

module.exports = {
  presets: [
    ['@babel/preset-env', {
      'modules': false,
      'targets': {
        'chrome': 70,
        'firefox': 64,
      },
    }],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    'preval',
    '@babel/plugin-transform-typescript',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    'react-hot-loader/babel',
    ['module-resolver', {
      'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'root': [paths.appSrc || './src']
    }],
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-optional-catch-binding',
    'styled-components',
  ],
  "env": {
    "test": {
      presets: [
        ['@babel/preset-env', {
          'modules': 'commonjs',
          'targets': {
            'chrome': 70,
            'firefox': 64,
          },
        }],
        '@babel/react',
        '@babel/typescript',
      ],
    },
  },
};
