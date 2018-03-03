const base = require('./webpack.base.config');

// load base config, then add new empty array of plugins
const config = Object.assign({}, base, {
  plugins: base.plugins || []
});

module.exports = config;
