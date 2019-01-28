# **⚠ The CLI is currently not production ready. It's using react@16.8.0-alpha.0 to gain early access for Hooks. ⚠**

# VE React CLI

### Development tool for consistent React environments.

>_The **ve** stands for Visiba Engineering. The entire thing is a play on one of our company motto, "we act" -> "**v**e **Re**act". Clever uh? Okey, it was a bit silly._

## Motivation
Development environments for modern JavaScript has become quite a hassle to set up, having one dedicated repository helped tackling the time investment of creating and managing these.

It solves two problems:
* It'll trim off the stuff that's only relevant when first setting up the project. All the configurations and packages that exists to serve the project will be "hidden" for the developers, it'll allow us to focus on what the project is primarily made of.
* Makes it possible to sync multiple React environments to use the same configurations without the need to update individual files in each. All that's needed is to install the newest.

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
* new project: `--new {name of project}` short: `-n`

### Local
* development: `--dev` short: `-d`
* production: `--build` short: `-b`
* run production: `--start` short: `-s`
* overwrite default port: `--port` short: `-p`
* overwrite default port: `--input` short: `-i`
* overwrite default port: `--output` short: `-o`

## Notable packages
| Tools                    | Version | Info                                          |
|--------------------------|---------|-----------------------------------------------|
| webpack                  | ^4.27.1 | Dev server and bundler                        |
| @babel/core              | ^7.0.0  | ECMAScript transpiler                         |
| @babel/preset-react      | ^7.0.0  | Transforms JSX                                |
| @babel/preset-typescript | ^7.1.0  | Enables TS in a Babel environment             |
| offline-plugin           | ^5.0.6  | Generates Service Worker with offline support |

## License
This project is licensed under the MIT License - see the `LICENSE` file for details.