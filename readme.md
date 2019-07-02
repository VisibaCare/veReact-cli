# ve-react-cli
>_The **ve** stands for Visiba Engineering. The entire thing is a play on one of our company motto, "we act" -> "**v**e **Re**act". Clever uh? Okey, it was a bit silly._

A modern React toolkit with primary focus on TypeScript.

## Getting started

### Installation
Install ve-react-cli globally:
```bash
$ npm install -g ve-react-cli

# or with Yarn
$ yarn global add ve-react-cli --prefix /usr/local
```

### Creating a new application
After it's been installed globally, we can create a new application with it.

```bash
$ ve new my-project
$ cd my-project/
$ yarn install
```

## Commands
List of available `ve` commands.

### Global
* new application: `new {name of application}`

### Local
* development: `dev {options}`
* production: `build {options}`
* run production: `start {options}`

### Optional
* override default port (default: `8000`): `-p, --port`
* override default input (default: `./src`): `-i, --input`
* override default output (default: `./dist`): `-o, --output`

## Plugins
For advanced customization, plugins can be made to alter each build configuration.

Plugins can be created by adding an `.verc.js` file in the root directory.

```ts
// .verc.js
const { createPlugin } = require('ve-react-cli');

const myPlugin = () => createPlugin({
  modifyBabelRc: (babelrc) => {    
    return babelrc;
  },
  modifyWebpackDev: (webpack) => {
    return webpack;
  },
  modifyWebpackProd: (webpack) => {
    return webpack;
  },
});

module.exports = {
  plugins: [myPlugin()],
};
```

## License
This project is licensed under the MIT License - see the `LICENSE` file for details.
