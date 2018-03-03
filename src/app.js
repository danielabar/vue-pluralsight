import Vue from 'vue'

// Initialize vue
const app = new Vue({
  data: {
    hello: 'hi there test is this thing on?'
  },
  // HMR support so Vue can know how to re-render the section it's mounted on
  template: '<div id="app">{{ hello }}</div>'
})

export { app }
