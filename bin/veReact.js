#!/usr/bin/env node
'use strict';

const path = require('path');
const resolvePath = (src) => path.join(__dirname, `../src/${src}`);
const program = require('commander');
const { setGlobalState } = require(resolvePath('globalState'));
const {
  DEFAULT_INPUT_FOLDER,
  DEFAULT_OUTPUT_FOLDER,
  DEFAULT_PROJECT_NAME,
  DEFAULT_PORT,
  DEFAULT_DIR,
  DEFAULT_PUBLIC_PATH,
} = require(resolvePath('inMemoryConstants'));

// Available scripts
const scriptMap = new Map();

// Locals
scriptMap.set('dev', () => require(resolvePath('scripts/development')));
scriptMap.set('build', () => require(resolvePath('scripts/production')));
scriptMap.set('start', () => require(resolvePath('scripts/server')));

// Globals
scriptMap.set('create', () => require(resolvePath('scripts/create')));

// Execute command
function run(runScript, cmd) {
  const { port, input, output, dir, publicPath, label, analyzer, browserSync, env } = cmd;

  const config = {
    input: input || DEFAULT_INPUT_FOLDER,
    output: output || DEFAULT_OUTPUT_FOLDER,
    name: label || DEFAULT_PROJECT_NAME,
    port: port || DEFAULT_PORT,
    dir: dir || DEFAULT_DIR,
    publicPath: publicPath || DEFAULT_PUBLIC_PATH,
    analyzer: !!analyzer,
    browserSync: !!browserSync,
    browserSyncPort: null,
    buildConfig: env || null,
  };

  process.env.PORT = port || 8000;

  if (config.browserSync) {
    config.browserSyncPort = parseInt(process.env.PORT, 10) + 100;
  }

  setGlobalState(config);

  if (scriptMap.has(runScript)) {
    scriptMap.get(runScript)();
  } else {
    console.log(`
      Command not found.
      Type "ve --help" for available commands.
    `);
  }
}

// Cli
program
  .version(require(path.join(__dirname, '../package.json')).version);

program
  .command('dev')
  .option('-p, --port <port>', 'Sets "process.env.PORT" to value')
  .option('-i --input <input>', 'Override default application src')
  .option('-o --output <output>', 'Override default production build destination')
  .option('-l, --label <label>', 'Sets a name for the project')
  .option('-b, --browserSync', 'Enables browser sync')
  .option('-e, --env <env>', 'Custom env property')
  .action((cmd) => run('dev', cmd));

program
  .command('build')
  .option('-i --input <input>', 'Override default application src')
  .option('-o --output <output>', 'Override default bundle destination')
  .option('-l, --label <label>', 'Sets a name for the project')
  .option('-p, --publicPath <publicPath>', 'Sets a public path')
  .option('-a, --analyzer', 'Enables analyzer')
  .option('-e, --env <env>', 'Custom env property')
  .action((cmd) => run('build', cmd));

program
  .command('start')
  .option('-p, --port <port>', 'Sets "process.env.PORT" to value')
  .option('-i --input <input>', 'Override default application src')
  .option('-o --output <output>', 'Override default bundle destination')
  .option('-l, --label <label>', 'Sets a name for the project')
  .action((cmd) => run('start', cmd));

program
  .command('new <dir>')
  .action((dir) => run('create', { dir }));

program.parse(process.argv);
