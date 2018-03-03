import Vue from 'vue'
import AppLayout from './theme/Layout.vue'
import router from './router'

console.log(AppLayout)

// extemd Vue instance with router plugin instance
const app = new Vue({
  router,
  ...AppLayout
})

// export router as well because it may be needed by client entry later
export { app, router }
