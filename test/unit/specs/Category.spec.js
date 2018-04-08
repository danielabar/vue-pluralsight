import 'es6-promise/auto'
import Vue from 'vue'
import store from '../../../src/vuex/index.js'
import VueRouter from 'vue-router'
import Category from '../../../src/theme/Category.vue'

describe('Category.vue', () => {
  it('loads front-end links', done => {
    Vue.use(VueRouter)
    // dummy router instance
    const router = new VueRouter({
      routes: [
        {path: '/', component: Category}
      ]
    })

    // Category component uses router heavily as a dependency
    const vm = new Vue({
      el: document.createElement('div'),
      router,
      store,
      // i.e. <div><router-view></router-view></div>
      render: h => h('router-view')
    })

    // flaky: depending on real ajax request - homework: mock this
    store.watch(
      (state) => {
        return state.postsModule.posts
      },
      function () {
        console.log(vm.$el)
        expect(vm.$el.querySelectorAll('.column').length).to.equal(6)
        done()
      }
    )
    // console.log(vm.$el) // with no api hooked up: <div class="columns"></div>
    // done()
  })
})
