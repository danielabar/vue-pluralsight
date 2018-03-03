const base = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// extend base config, including a new `plugins` property, initialized to empty array
const config = Object.assign({}, base, {
  plugins: base.plugins || []
});

// modify vue loader rule to make use of extract text plugin
config.module.rules
  .filter(x => {return x.loader === 'vue-loader'})
  .forEach(x => x.options.extractCSS = true)

// ExtractTextPlugin accepts a file name where styles will be saved
config.plugins.push(
  new ExtractTextPlugin('assets/styles.css')
)

module.exports = config;
