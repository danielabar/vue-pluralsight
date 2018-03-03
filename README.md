<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Single Page Applications with Vue.js](#single-page-applications-with-vuejs)
  - [Environment Setup - Build Process](#environment-setup---build-process)
    - [Project Files](#project-files)
    - [Package Management](#package-management)
    - [Web Server](#web-server)
    - [Web Server - Index.html](#web-server---indexhtml)
    - [Webpack - Setup](#webpack---setup)
    - [Dev Middleware](#dev-middleware)
    - [Hot Reloading](#hot-reloading)
    - [Linting](#linting)
  - [Single File Components](#single-file-components)
    - [Vue Component](#vue-component)
    - [.Vue Files](#vue-files)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Single Page Applications with Vue.js

> Notes from Pluralsight [course](https://app.pluralsight.com/library/courses/vue-js-single-page-applications/table-of-contents)

## Environment Setup - Build Process

### Project Files

Project [src](https://github.com/bstavroulakis/vue-spa)

![git-modules](course-images/git-modules.png "git-modules")

### Package Management

Use `npm init -y` to start a project accepting defaults.

Course is using this version of vue:

```shell
npm install vue@2.4.2 --save
```

### Web Server

This course will use express for both dev and production.


```shell
npm install express@4.15.4 --save
```

[server.js](server.js)

Start server:

```shell
nodemon server.js
```

Then visit [http://localhost:3000/](http://localhost:3000/)

### Web Server - Index.html

Use node's `fs` (file system) module to return `index.html` on any GET request.

Use npm scripts section to make shortcuts of commonly used commands.

### Webpack - Setup

![build-process](course-images/build-process.png)
For browsers, need a module bundler. For this course, will use Webpack as module bundler, and use various plugins to transpile, minify, and run other build processess.

[Base webpack config](build/webpack.base.config.js)

Specific version of webpack used for this course:

```shell
npm install webpack@3.5.5 --save-dev
```

Webpack file has a `config` json that includes all settings needed for webpack.

Webpack modules start with `entry`.

`output` sets path of generated output files (polyfilled code), to `dist` dir, which will be accessed via root path.
`[name]` will be filled in with `app` from `entry` section.

To run webpack:

```shell
node ./node_modules/webpack/bin/webpack --config ./build/webpack.base.config.js
```

To start using vue, import it in [src/app.js](src/app.js), initialize it, export it, then import app in [src/client-entry.js](src/client-entry.js).

Client entry mounts vue app into a dom element that must exist in index.html:

```javascript
app.$mount('#app');
```

Update [server.js](server.js) to use express static module to serve anything in dist dir.

### Dev Middleware

Inconvenient to have to restart web server on every change and re-run webpack build.

Install a few webpack plugins to make development more efficient:

```shell
npm install webpack-dev-middleware@1.12.0 webpack-hot-middleware@2.18.2 --save-dev
```

With dev middleware, dist files are not created on disk, but in memory. And only module that has changed will be rebuilt.
Hot middleware will reload only section that has changed in bundle.

Use the middleware in [build/dev-server.js](build/dev-server.js).

To be sure dist files are being loaded from memory, delete `dist` dir and run `npm start`. (no longer need separate step to run webpack build).

Notice output of webpack build, this time bundle is generated at `assets/js/app.js`, not `dist/assets/js/app.js`. Need to update script tag in index.html.

Now you can change module, for example string in app.js and webpack build will automatically re-run. Still need to refresh browser to see change.

### Hot Reloading

To start, introduce [build/webpack.client.config](build/webpack.client.config) and require the base config from within the client config. Then modify [build/dev-server.js](build/dev-server.js) to use client config instead of base config.

To make hot reloading work:

1. Extend client config adding a new entry point (dev-server)
2. Push two more plugins (dev-server)
3. Accept hot module in [src/client-entry.js](src/client-entry.js)
4. Add template definition in Vue instantiation [src/app.js](src/app.js) so that Vue can re-render template

Now can make a change to any module, then hot middleware through hot module replacement plugin injects changes, then vue knows how to render it.

### Linting

Will use ESLint. [.eslintrc.js](.eslintrc.js). To install the dev deps:

```shell
npm install eslint@4.5.0 eslint-loader@1.9.0 eslint-plugin-html@3.2.0 eslint-config-standard@10.2.1 eslint-plugin-promise@3.5.0 eslint-plugin-standard@3.0.1 eslint-plugin-import@2.7.0 eslint-plugin-node@5.1.1 --save-dev
```

Modify [build/webpack.base.config.js](build/webpack.base.config.js) to hook up linting into build process.

Now when server is restarted, build will fail on lint errors.

## Single File Components

Vue uses single file components, each file contains a template for html, a script for js and style for css.

### Vue Component

One way to do things is to declare a component using `Vue.component` method.

On first load, client entry will mount view instance to the div with id of `app` and create an `<app></app>` element.
`<app></app>` element is configured in app.js with a template, so `<app></app>` element will be replaced with app template configuration.

### .Vue Files

Recommended way of doing things. Example [src/theme/Layout.vue](src/theme/Layout.vue)

`<template>` section contains html of component.

import the .vue file in app.js

Need to add a webpack loader to load .vue files, add a new rule in `module` section of [build/webpack.base.config.js](build/webpack.base.config.js).

A few more dev dependencies needed to make this work:

```shell
npm install vue-loader@13.0.2 vue-template-compiler@2.4.2 --save-dev
```

Note that eslint can also lint .vue files so add that to the `test` property of the lint rule.

Now can remove this section from client-entry because vue-loader handles HMR:

```javascript
if (module.hot) {
  module.hot.accept()
}
```

Loader uses vue template compiler, so can remove `resolve` section from webpack base config that was compiling templates on the fly.
