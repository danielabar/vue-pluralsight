// include express module
const express = require('express')
// instantiate express server
const app = express()

const fs = require('fs')
const path = require('path')

// server side rendering
const serialize = require('serialize-javascript')
const { createBundleRenderer } = require('vue-server-renderer')
let renderer

const indexHTML = (() => {
  // return path relative to server.js file
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

// serve static assets in dist dir
app.use('/dist', express.static(path.resolve(__dirname, './dist')))

// should only be used for development: require dev server module and pass in app reference
// this extends server with two new modules
// second function argument is the `onUpdate` callback
// every time server bundle changes, will receive new bundle and generate a new renderer
require('./build/dev-server')(app, bundle => {
  renderer = createBundleRenderer(bundle)
  console.log(`=== RENDERER CREATED`)
})

// create handler for all GET requests
app.get('*', (req, res) => {
  const context = {url: req.url}
  console.log(`=== INVOKING RENDERER`)
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Server Error')
    }
    html = indexHTML.replace('{{ APP }}', html)
    html = html.replace('{{ STATE }}',
      `<script>window.__INITIAL_STATE__=${serialize(context.initialState, {isJSON: true})}</script>`)
    res.write(html)
    res.end()
  })
})

// specify a port
const port = process.env.PORT || 3000
// listen on port and display callback
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
