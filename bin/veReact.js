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
let runScript = '__NO_SCRIPT__';
const scriptMap = new Map();
scriptMap.set('create', () => require(resolvePath('scripts/create')));
scriptMap.set('dev', () => require(resolvePath('scripts/development')));
scriptMap.set('build', () => require(resolvePath('scripts/production')));
scriptMap.set('server', () => require(resolvePath('scripts/server')));

// Optional variables
let port;
let input;
let output;
let name;
let dir;

// Cli
program
  .option('-n, --new <name>', '', (name) => {
    runScript = 'create';

    // Name of folder when creating new project
    dir = name;
  })
  .option('-d, --dev', '', () => {
    runScript = 'dev';
  })
  .option('-b, --build', '', () => {
    runScript = 'build';
  })
  .option('-s, --start', '', () => {
    runScript = 'server';
  })
  .option('-p', '--port', '', (newPort) => {
    port = newPort;
  })
  .option('-i', '--input', '', (newInput) => {
    input = newInput;
  })
  .option('-o', '--output', '', (newOutput) => {
    input = newOutput;
  })
  .parse(process.argv);

setGlobalState({
  input: input || DEFAULT_INPUT_FOLDER,
  output: output || DEFAULT_OUTPUT_FOLDER,
  name: name || DEFAULT_PROJECT_NAME,
  port: port || DEFAULT_PORT,
  dir: dir || DEFAULT_DIR,
});

process.env.PORT = port || 8000;

if (scriptMap.has(runScript)) scriptMap.get(runScript)();
