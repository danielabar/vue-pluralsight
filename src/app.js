import Vue from 'vue'

// Use component method to create a component named `app`.
// Template has a div with id of `app` used for initial binding.
// Webapp has navigation section
// Classes are linked with a css library that will be included later.
// Main section is container for site's data.
// Footer section is last.
Vue.component('app', {
  template: `
    <div id="app">
      <nav class="nav has-shadow">
        <div class="container">
          <a href="/">
            <img src="http://bit.ly/vue-img"
              alt="Vue SPA" />
          </a>
        </div>
      </nav>
      <section class="main-section section"></section>
      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            Follow us on
            <a href="https://twitter.com/bstavroulakis"
            target="_blank">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  `
})

// `render` property is a Vue.js function that returns an element
// element to be returned is the `app` element.
const app = new Vue({
  render: h => h('app')
})

export { app }
