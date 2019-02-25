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
} = require(resolvePath('constants'));

// Available scripts
const scriptMap = new Map();

// Locals
scriptMap.set('dev', () => require(resolvePath('scripts/development')));
scriptMap.set('build', () => require(resolvePath('scripts/production')));
scriptMap.set('server', () => require(resolvePath('scripts/server')));

// Globals
scriptMap.set('create', () => require(resolvePath('scripts/create')));

// Execute command
function run(runScript, cmd) {
  const { port, input, output, dir, label } = cmd;

  setGlobalState({
    input: input || DEFAULT_INPUT_FOLDER,
    output: output || DEFAULT_OUTPUT_FOLDER,
    name: label || DEFAULT_PROJECT_NAME,
    port: port || DEFAULT_PORT,
    dir: dir || DEFAULT_DIR,
  });
  
  process.env.PORT = port || 8000;
  
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
  .action((cmd) => run('dev', cmd));

program
  .command('build')
  .option('-i --input <input>', 'Override default application src')
  .option('-o --output <output>', 'Override default bundle destination')
  .option('-l, --label <label>', 'Sets a name for the project')
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
