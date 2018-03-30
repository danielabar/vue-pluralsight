import {app, router} from './app'

// need onReady for SSR
router.onReady(() => {
  // mount vue instance to a dom element with id of `app`, which must exist in index.html
  // i.e. <div id="app"></div>
  app.$mount('#app')
})
