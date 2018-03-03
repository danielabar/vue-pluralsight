const base = require('./webpack.base.config');

// extend base config, including a new `plugins` property, initialized to empty array
const config = Object.assign({}, base, {
  plugins: base.plugins || []
});

module.exports = config;
