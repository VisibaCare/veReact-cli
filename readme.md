# VE React CLI

### Development tool for consistent React environments.

>_The **ve** stands for Visiba Engineering. The entire thing is a play on one of our company motto, "we act" -> "**v**e **Re**act". Clever uh? Okey, it was a bit silly._

## Motivation
Development environments for modern JavaScript has become quite a hassle to set up, having one dedicated repository helped tackling the time investment of creating and managing these.

It solves two problems:
* It'll trim off the stuff that's only relevant when first setting up the project. All the configurations and packages that exists to serve the project will be "hidden" for the developers, it'll allow us to focus on what the project is primarily made of.
* Makes it possible to sync multiple React environments to use the same configurations without the need to update individual files in each. All that's needed is to install the newest version of `ve-react-cli`.

## Getting started
Install the package globally
```bash
$ npm install -g ve-react-cli

# or with Yarn
$ yarn global add ve-react-cli --prefix /usr/local
```

## Commands
List of available `ve` commands.

### Global
* new project: `new {name of project}`

### Local
* development: `dev {options}`
* production: `build {options}`
* run production: `start {options}`

### Optional
* override default port (default: `8000`): `-p, --port`
* override default input (default: `./src`): `-i, --input`
* override default output (default: `./dist`): `-o, --output`

## Notable packages that's used
| Tools                          | Version | Info                                          |
|--------------------------------|---------|-----------------------------------------------|
| webpack                        | ^4.27.1 | Dev server and bundler                        |
| @babel/core                    | ^7.0.0  | ECMAScript transpiler                         |
| @babel/preset-react            | ^7.0.0  | Transforms JSX                                |
| @babel/preset-typescript       | ^7.1.0  | Enables TS in a Babel environment             |
| babel-plugin-preval            | ^3.0.1  | Pre-evaluate code at build-time               |
| babel-plugin-styled-components | ^1.5.0  | Enhances debugging and minifies CSS           |
| offline-plugin                 | ^5.0.6  | Generates Service Worker with offline support |

## Todos
* Add support to read and write out variables when copying templates, e.g. version.
* Add ways to extend and override Babel config & Webpack config. 
* Add "create component" & "create page" commands.
* Add a way to create custom templates.

## License
This project is licensed under the MIT License - see the `LICENSE` file for details.