const path = require('path');

const config = {
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.js')
  },
  module: {
    rules: [
      {
        enforce: 'pre',          // check source files before they're modified by other loaders.
        test: /(\.js$)/,         // lint js files
        loader: 'eslint-loader', // using eslint-loader
        exclude: /node_modules/  // do not lint node_modules folder
      }
    ]
  },
  // temporary to compile vue templates on the fly but not recommended for performance
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'assets/js/[name].js'
  }
};

module.exports = config;
