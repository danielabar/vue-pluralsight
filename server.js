// include express module
const express = require('express');
// instantiate express server
const app = express();

const fs = require('fs');
const path = require('path');

const indexHTML = (() => {
  // return path relative to server.js file
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8');
})();

// serve static assets in dist dir
app.use('/dist', express.static(path.resolve(__dirname, './dist')));

// should only be used for development: require dev server module and pass in app reference
// this extends server with two new modules
require('./build/dev-server')(app);

// create handler for all GET requests
app.get('*', (req, res) => {
  res.write(indexHTML);
  res.end();
});

// specify a port
const port = process.env.PORT || 3000;
// listen on port and display callback
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
