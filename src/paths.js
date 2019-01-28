const path = require('path');
const fs = require('fs');
const { getGlobalState } = require('./globalState');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

let paths = {};

function setPaths() {
  const { input, output } = getGlobalState();

  paths = {
    publicPath: resolveApp('/'),
    appBuild: resolveApp(output),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndex: resolveApp(`${input}/index.tsx`),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp(input),
    appNodeModules: resolveApp('node_modules'),
  };
}

function getPaths() {
  return paths;
}

module.exports = {
  setPaths,
  getPaths,
  resolveApp,
}
