const base = require('./webback.base.config.js')

let config = Object.assign({}, base, {})

// no need for app entry during tests
delete config.entry

module.exports = config
