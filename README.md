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
    - [ES6 Transpiling](#es6-transpiling)
    - [Styles](#styles)
    - [Template Binding](#template-binding)
    - [Child Components](#child-components)
    - [Custom Properties](#custom-properties)
    - [Slots](#slots)
    - [Scoped Styles](#scoped-styles)
    - [Extract Styles](#extract-styles)

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

### ES6 Transpiling

From `console.log(AppLayout)` can see that it has `render` property.

Can use ES2015 spread syntax to replace this:

```javascript
const app = new Vue({
  render: h => h(AppLayout)
})
```

With this:

```javascript
const app = new Vue({
  ...AppLayout
})
```

Properties of AppLayout will `spread` to json properties that declare Vue instance.

Use Babel in case not all browsers support all features of ES2015/16.

Add babel loader test in rules section of webback base config.

Install babel loader and deps:

```shell
npm install babel-core@6.26.0 babel-eslint@7.2.3 babel-loader@7.1.2 babel-preset-es2015@6.24.1 babel-preset-stage-2@6.24.1 --save-dev
```

Update [.eslintrc.js](.eslintrc.js) to include babel eslint parser.

Finally configure babel with [.babelrc](.babelrc). This specifies for babel NOT to use modulesl because that's being handled by webpack.

### Styles

For this course, will use something smaller than Bootstrap, instead will use [Bulma](https://bulma.io/documentation/columns/basics/).

```shell
npm install bulma@0.5.1 --save
```

Then add `<style></style>` tag to [Layout.vue](src/theme/Layout.vue)

This tag accepts a lang attribute to indicate what to use to pre-process css (scss or stylus).
(same is true for script and template tags, for example could have `lang="coffee"` to use CoffeeScript).

For this course, will use sass `<style lang="scss">...</style>`.

Will need to add appropriate loader to webpack config to parse styles, and install deps:

```shell
npm install css-loader@0.28.5 sass-loader@6.0.6 node-sass@4.5.3 --save-dev
```

### Template Binding

Will be building a site containing a curation of the latest front end development resources. Eventually app will consume list of articles from a REST service. For now, hard-coded locally.

Start by adding `data` property to [Layout.vue](src/theme/Layout.vue)

Template section of .vue file has access to data from script via *data binding*.

Use `v-for` *directive* to iterate over a list of items:

```html
<div class="column is-one-third" v-for="(post, title) in posts" v-bind:key="post.id">
  <h3>{{ post.title }}</h3>
  {{ post.content }}
</div>
```

Can bind `href` attribute to data:

```html
<a class="card-footer-item" :href="post.link" target="_blank">Read More</a>
```

### Child Components

Layout.vue is getting too big having all the site's content. Break it up into *child components*.

[AppHeader.vue](src/theme/AppHeader.vue) | [AppFooter.vue](src/theme/AppFooter.vue)

Move header and footer sections of Layout.vue into Header and Footer components respectively.

Then need to include these new components in Layout.vue by importing them and defining them as components:

```javascript
<script>
  import AppHeader from './AppHeader.vue'
  import AppFooter from './AppFooter.vue'
  export default {
    components: {
      'app-header': AppHeader,
      'app-footer': AppFooter
    },
    data () {
      ...
    }
  }
```

Then using the custom elements in the template:

```html
<template>
  <div>
    <app-header></app-header>
    <section class="main-section section">
      ...
    </section>
    <app-footer></app-footer>
  </div>
</template>
```

Also pull out all the cards to a Category component.

### Custom Properties

In previous module, we created static child components. Want to create dynamic child components, pass in data to them.
One way to do this is with *custom properties*. Example [Post.vue](src/theme/Post.vue).

Use `props` property. This is an array that binds the property of the component with attribute of the element.

![bind-props](course-images/bind-props.png)

Move card snippet to Post component. Now it needs data passed in to it. This is done by binding the custom `<app-post>` element with the `post` json data, via `props`:

```html
<div class="column is-one-third" v-for="(post, title) in posts" v-bind:key="post.id">
  <app-post :post="post"></app-post>
</div>
```

### Slots

Passing in data via props is good enough for some cases, but may want more control over template of child component. Do this with slots. For example:

Remove post title from Post component and move it to Category component:

```html
<app-post :post="post">
  <h3>{{ post.title }}</h3>
</app-post>
```

At first, header will disappear from rendered page. Because Vue parsed the h3 title but doesn't know where to add it.

This can be specified with `<slot>` element in the child element `<app-post>`:

```html
<div class="card-content">
  <slot></slot>             <--- <h3> element from parent Category component will be "slotted" in here
  {{ post.content }}
</div>
```

But if also want to remove `{{ post.content }}` from Post element, need to bind multiple content areas with multiple slots.

To do this, in the child component, give each slot a name:

```html
<div class="card-content">
  <slot name="title"></slot>
  <slot name="content"></slot>
</div>
```

Then reference the content with the slot name in the parent component:

```html
<div class="column is-one-third" v-for="(post, title) in posts" v-bind:key="post.id">
  <app-post :post="post">
    <h3 slot="title">{{ post.title }}</h3>
    <span slot="content">{{ post.content }}</span>
  </app-post>
</div>
```

Finally, change Post component so only link is a property.

Benefit of using slots is component can be re-used but with different elements. For example, in another view cards could be used with an h2 tag instead of h3 for the title slot.

### Scoped Styles

For example, want to fix the card styling so they all have the same height.

Add `<style>` tag with following css Post.vue to fix this:

```css
.card {
  padding-bottom: 40px;
  height: 100%;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}
```

However, this breaks footer.

When style tag is added in Vue component, Vue adds it to `<head>` of html page. This means styles are included *globally*.

In the card example, `footer` style is intended to style only the `<footer>` element in the Post component. There is also a `<footer>` element in Layout component so the style unintentionally leaked out and affected the Layout component as well.

To fix this, add `scoped` attribute to style element: `<style scoped>`. Still adds style to head of document, but now it looks something like this:

```css
.card[data-v-8f18fd88] {
  padding-bottom: 40px;
  height: 100%;
}
footer[data-v-8f18fd88] {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}
```

And the corresponding data attribute is added to the card elements rendered by the Post component, so these styles only get applied to Post component.

### Extract Styles

So far, style tag has been used twice, in Layout component to define global rules, and in Post component to define scoped styles.
Having the style tag in the .vue file means as output of build, the styles are actually stored in the js bundle file. This is not good practice. Would like to have styles in a separate file, such as `styles.css`, which can be cached, cdn, etc.

Use extract styles module:

```bash
npm install extract-text-webpack-plugin@3.0.0 --save-dev
```

Add this plugin in [webpack.client.config.js](build/webpack.client.config.js).

To use it, need `extractCSS: true` in the css loader of webpack but don't want to add this to base config because later will have server side rendering and not want this. So add it to client config, modifying the rules:

```javascript
config.module.rules
  .filter(x => {return x.loader === 'vue-loader'})
  .forEach(x => x.options.extractCSS = true)
```

Finally, modify [index.html](index.html) to include the extracted css file:

```html
<link rel="stylesheet" href="/assets/styles.css">
```
