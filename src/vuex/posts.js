import appService from '../app.service.js'

const defaultState = {
  posts: [],
  categoryId: 0
}

// server side rendering
const inBrowser = typeof window !== 'undefined'
const state = (inBrowser && window.__INITIAL_STATE__) ? window.__INITIAL_STATE__.postsModule : defaultState

const getters = {
  posts: state => state.posts
}

const actions = {
  updateCategory (context, categoryId) {
    return appService.getPosts(categoryId).then(data => {
      context.commit('updateCategory', {categoryId, posts: data})
    })
  }
}

const mutations = {
  updateCategory (sate, category) {
    state.categoryId = category.categoryId
    state.posts = category.posts
  }
}

// setting namespace to true wraps all of the elements of this module under a namespace
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
