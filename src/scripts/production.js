const { setPaths } = require('../paths');
setPaths();

const webpack = require('webpack');
const chalk = require('chalk');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getGlobalState } = require('../globalState');
const getConfigs = require('../getConfigs');

const { name, analyzer, buildConfig } = getGlobalState();

getConfigs(({ webpackProduction }) => {
  process.env.NODE_ENV = 'production';
  process.env['BUILD_CONFIG'] = buildConfig || 'production';

  if (analyzer) {
    webpackProduction.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
    );
  }

  // https://github.com/webpack/webpack/blob/8a7597aa6eb2eef66a8f9db3a0c49bcb96022a94/lib/SizeFormatHelpers.js
  const formatSize = (size) => {
    if (typeof size !== 'number' || Number.isNaN(size) === true) {
      return 'unknown size';
    }

    if (size <= 0) {
      return '0 bytes';
    }

    const abbreviations = ['bytes', 'KiB', 'MiB', 'GiB'];
    const index = Math.floor(Math.log(size) / Math.log(1024));
    const sizeNumber = +(size / Math.pow(1024, index)).toPrecision(3);

    let sizeText = chalk.green(sizeNumber);

    if (index === 2 || index === 3) {
      sizeText = chalk.yellow(sizeNumber);
    }

    if (index === 1 && sizeNumber >= 300) {
      sizeText = chalk.yellow(sizeNumber);
    }

    return `${sizeText} ${abbreviations[index]}`;
  }

  console.log(`Building ${chalk.green(name)} ...`);

  let turtleCount = 0;

  const slowBuild = setInterval(() => {
    console.log(`[${[++turtleCount]}] 🐢`);
  }, 10000);

  webpack(webpackProduction, (error, stats) => {
    clearInterval(slowBuild);

    if (error) {
      throw new Error(error);
    }

    console.log(webpack.Stats.jsonToString(stats, true));
    console.log(`Version: webpack ${webpack.version}`);
    console.log(`Time: ${stats.endTime - stats.startTime}ms`);

    let otherModules = 0;

    Object.entries(stats.compilation.assets).forEach(([key, module], index) => {
      if (key.endsWith('.js') || key.endsWith('.html') || key.endsWith('.json')) {
        const size = formatSize(module.size());

        console.log(` [${index}] ${key} ${size}${module.emitted ? chalk.green(' [emitted]') : chalk.green(' [rendered]')}`);
      } else {
        otherModules++;
      }
    });

    console.log(` [-] + ${otherModules} misc assets`)

    console.log(`Successfully built ${chalk.green(name)} 🎉`);

    if (turtleCount > 0) {
      console.log(`This build took ${turtleCount} ${turtleCount === 1 ? 'turtle' : 'turtles'} to make 🐢`)
    }
  });
});
