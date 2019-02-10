# VE BoilerPlate
This project was generated with [VE React CLI](https://github.com/VisibaCare/veReact-cli) version 1.1.0.

## Getting started
Install node modules using [Yarn](https://yarnpkg.com/lang/en/). NPM does not currently work because of this [NPM issue](https://npm.community/t/packages-with-peerdependencies-are-incorrectly-hoisted/4794/5).

```bash
$ yarn install
```

## Development server
To start a dev server, run the following:
```bash
$ yarn dev
```
The application will automatically reload if you change any of the source files.

## Production Build
To build for production, run the following:
```bash
$ yarn build
```
The output files will be stored in the `dist/` directory.

## Running tests
To run tests, run the following:
```bash
$ yarn dev
```
The tests are served with [jest](https://jestjs.io/).

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
