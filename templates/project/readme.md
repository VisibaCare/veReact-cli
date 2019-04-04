# VE BoilerPlate
This project was generated with [VE React CLI](https://github.com/VisibaCare/veReact-cli) version 1.2.4.

## Getting started
Install node modules using [Yarn](https://yarnpkg.com/lang/en/). NPM does not currently work because of this [NPM issue](https://npm.community/t/packages-with-peerdependencies-are-incorrectly-hoisted/4794/5).

```bash
$ yarn install
```

## Development
### Dev server

To start a dev server, run the following:
```bash
$ yarn dev
```
The application will automatically reload if you change any of the source files.

### Component Documentation server

To start the component documentation server, run the following:
```bash
$ yarn docz
```

## Production Build

### Application Build
To build the application for production, run the following:
```bash
$ yarn build
```
The output files will be stored in the `dist/` directory.

_The production build can also be served on a built in express server (mostly to test its service worker) by running `yarn start`_

### Documentation client build
To generate a production Component Documentation, run the following:
```bash
$ yarn docz:build
```

## Running tests
### Unit & Integration
To run these tests, run the following:
```bash
$ yarn test
```
These tests are served with [jest](https://jestjs.io/).

# TypeScript
This bolierplate does not use the TypeScript emitter, only the compiler in the background as a type checker.

The code is being parsed with Babel, this means that any type that is wrong won't interfere with the code that Babel emits. It's recommended to validate the code base's types before it's supposed to be built to production.

To validate the types, run the following:
```bash
$ yarn validate
```

## Debug
To use VS Code's debugger: 
1. Add the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension to VS Code.
2. Create a `launch.json` file in the `.vscode/` directory.
3. Copy and paste the snippet down below in the `launch.json` file:

```JavaScript
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "launch",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:8000", // process.env.PORT
      "webRoot": "${workspaceRoot}/src",
      "breakOnLoad": true,
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack:///*": "${webRoot}/../*",
        "webpack:///./*": "${webRoot}/../*",
        "webpack:///src/*": "${webRoot}/../src/*",
        "webpack:///./~/*": "${webRoot}/../node_modules/*"
      }
    }
  ]
}
```

Pressing `F5` should now start a debug session.
