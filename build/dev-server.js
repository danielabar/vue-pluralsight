const webpack = require('webpack');
const clientConfig = require('./webpack.client.config');

// export function that receives express app
module.exports = function setupDevServer(app) {
  // add new entry point to clientConfig
  // this will notify server when bundle rebuilds
  clientConfig.entry.app = [
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ];

  // push two more plugins needed for hot middleware to work
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );

  // instantiate webpack with client config
  const clientCompiler = webpack(clientConfig)

  // extend express server with dev and hot middlewares
  app.use(
    require('webpack-dev-middleware')(clientCompiler, {
      stats: {
        colors: true
      }
    })
  );

  app.use(require('webpack-hot-middleware')(clientCompiler));
}
