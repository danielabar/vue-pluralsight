import {app} from './app'

// mount vue instance to a dom element with id of `app`, which must exist in index.html
app.$mount('#app')

// hot module reloading (dev only???)
if (module.hot) {
  // tell HMR module to stop propagation and flag that everything has been loaded correctly
  module.hot.accept()
}
