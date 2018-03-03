const webpack = require('webpack');
const clientConfig = require('./webpack.client.config');

// export function that receives express app
module.exports = function setupDevServer(app) {
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
