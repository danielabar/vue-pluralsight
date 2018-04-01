var webpackConfig = require('../../build/webpack.test.config.js')

// when karma runs, it passes a config object here
module.exports = function (config) {
  // config object has a `set` function used to configure Karma
  config.set({
    // browsers to run unit tests in
    browsers: ['PhantomJS'],
    // specify test frameworks
    frameworks: ['mocha', 'sinon-chai'],
    // array of files to be loaded in browser
    // index.js file will set files to be tested
    files: ['./index.js'],
    // specify preprocessors to transform and run depending on file types
    // webpack preprocesor needed to load .vue files and transpile ES2015
    preprocessors: {
      './index.js': ['webpack']
    },
    // specify installed plugins to make karma and various libraries work together
    plugins: [
      'karma-mocha',
      'karma-sinon-chai',
      'karma-phantomjs-launcher',
      'karma-webpack'
    ],
    // webpack preprocessor receives the base webpac config
    webpack: webpackConfig,
    // set option for webpack middleware to not show info because logs are too verbose
    webpackMiddleware: {
      noInfo: true
    }
  })
}
