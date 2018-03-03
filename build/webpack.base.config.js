const path = require('path');

const config = {
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.js')
  },
  module: {
    rules: [
      // eslint
      {
        enforce: 'pre',              // check source files before they're modified by other loaders
        test: /(\.js$)|(\.vue$)/,    // lint js and vue files
        loader: 'eslint-loader',     // using eslint-loader
        exclude: /node_modules/      // do not lint node_modules folder
      },
      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'assets/js/[name].js'
  }
};

module.exports = config;
