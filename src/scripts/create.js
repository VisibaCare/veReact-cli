const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const dogOrCat = require('../dogOrCat');
const { getGlobalState } = require('../globalState');
const { dir } = getGlobalState();

async function copyTemplate() {
  try {
    await fse.mkdir(dir);
    await fse.copy(path.join(__dirname, '../../templates/project'), `${process.cwd()}/${dir}`);

    console.log(`Created ${chalk.green(dir)} in ${chalk.underline.bold(process.cwd())} ${dogOrCat()}`);
  } catch (err) {
    console.error(err);
  }
}

copyTemplate();
