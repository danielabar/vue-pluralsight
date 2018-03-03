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
      // vue + css + sass
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          css: 'css-loader',
          'scss': 'css-loader|sass-loader'
        }
      },
      // babel
      // NOTE: no check for .vue files because this rule runs AFTER vue-loader converts .vue files to .js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
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
