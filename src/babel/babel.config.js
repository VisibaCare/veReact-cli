const getConfig = () => {
  const { getPaths } = require('../paths');
  const paths = getPaths();

  const presetsRunTime = [
    ['@babel/preset-env', {
      'modules': false,
      'targets': {
        'chrome': 70,
        'firefox': 64,
      },
    }],
    '@babel/typescript',
  ];

  const presetsTest = [
    ['@babel/preset-env', {
      'modules': 'commonjs',
      'targets': {
        'chrome': 70,
        'firefox': 64,
      },
    }],
    '@babel/typescript',
  ];

  const config = {
    presets: presetsRunTime,
    plugins: [
      'preval',
      '@babel/transform-typescript',
      ['@babel/proposal-decorators', { 'legacy': true }],
      ['module-resolver', {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'root': [paths.appSrc || './src']
      }],
      '@babel/syntax-dynamic-import',
      ['@babel/proposal-class-properties', { 'loose': true }],
      '@babel/proposal-object-rest-spread',
      '@babel/transform-runtime',
      '@babel/proposal-function-sent',
      '@babel/proposal-export-namespace-from',
      '@babel/proposal-numeric-separator',
      '@babel/proposal-throw-expressions',
      '@babel/syntax-import-meta',
      '@babel/proposal-json-strings',
      '@babel/proposal-optional-catch-binding',
      'styled-components',
    ],
    "env": {
      "test": {
        presets: presetsTest,
      },
    },
  };

  try {
    require.resolve('react');

    presetsRunTime.splice(1, 0, '@babel/react');
    presetsTest.splice(1, 0, '@babel/react');
    config.plugins.splice(3, 0, 'react-hot-loader/babel');
  } finally {
    return config;
  }
}

module.exports = getConfig;
