import Vue from 'vue'
import AppLayout from './theme/Layout.vue'

// `render` property is a Vue.js function that returns an element
// include AppLayout as the rendered result
const app = new Vue({
  render: h => h(AppLayout)
})

export { app }
