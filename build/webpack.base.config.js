const path = require('path');

const config = {
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.js')
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
