import Vue from 'vue'
import VueRouter from 'vue-router'
import Category from './theme/Category.vue'
import Login from './theme/Login.vue'

// connect VueRouter plugin with Vue configuration
Vue.use(VueRouter)

// configure router with an object of options
// `router` is a property of options object to specify an array
// this array will link routes with components
// any component referenced in routes must be imported above
// recall in app.js, Layout component is mapped to the Vue app
const router = new VueRouter({
  // navigation without the hash
  mode: 'history',
  // customize router navigation active class
  linkActiveClass: 'is-active',
  // make each navigation scroll to top
  scrollBehavior: (to, from, savedPosition) => ({Y: 0}),
  routes: [
    {path: '/login', component: Login},
    {path: '/', component: Category}
  ]
})

export default router
