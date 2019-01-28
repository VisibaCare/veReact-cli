const fse = require('fs-extra');
const path = require('path');
const { getGlobalState } = require('../globalState');
const { dir } = getGlobalState();

async function copyTemplate() {
  try {
    await fse.mkdir(dir);
    await fse.copy(path.join(__dirname, '../../template'), `${process.cwd()}/${dir}`);
  } catch (err) {
    console.error(err);
  }
}

copyTemplate();
