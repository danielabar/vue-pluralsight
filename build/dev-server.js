const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')
// server side rendering
const serverConfig = require('./webpack.server.config')
const MFS = require('memory-fs')
const path = require('path')

// export function that receives express app and onUpdate callback
// see server.js for how this is called: require('./build/dev-server')(app, bundle => {...
module.exports = function setupDevServer (app, onUpdate) {
  // add new entry point to clientConfig
  // this will notify server when bundle rebuilds
  clientConfig.entry.app = [
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ]

  // push two more plugins needed for hot middleware to work
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  // instantiate webpack with client config
  const clientCompiler = webpack(clientConfig)

  // extend express server with dev and hot middlewares
  app.use(
    require('webpack-dev-middleware')(clientCompiler, {
      stats: {
        colors: true
      }
    })
  )

  app.use(require('webpack-hot-middleware')(clientCompiler))

  // server side rendering - for development, everything is compiled in memory, no actual files
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, 'server/main.js')
  serverCompiler.outputFileSystem = mfs
  // watch handler to trigger event every time source code changes
  serverCompiler.watch({}, () => {
    onUpdate(mfs.readFileSync(outputPath, 'utf-8'))
  })
}
