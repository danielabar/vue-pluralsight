import appService from '../app.service.js'

const state = {
  posts: [],
  categoryId: 0
}

const getters = {
  posts: state => state.posts
}

const actions = {
  updateCategory (context, categoryId) {
    appService.getPosts(categoryId).then(data => {
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
