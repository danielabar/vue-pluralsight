import Vue from 'vue'
import VueRouter from 'vue-router'

// Components: do not import right away if want to use lazy loading
import Category from './theme/Category.vue'
import Login from './theme/Login.vue'
import NotFound from './theme/NotFound.vue'

// Define components asynchronously to achieve lazy loading
// const Category = () => System.import('./theme/Category.vue')
// const Login = () => System.import('./theme/Login.vue')
// const NotFound = () => System.import('./theme/NotFound.vue')

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
    {path: '/category/:id', name: 'category', component: Category},
    {path: '/', redirect: '/category/front-end'},
    {path: '*', component: NotFound}
  ]
})

export default router
