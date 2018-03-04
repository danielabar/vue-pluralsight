import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../app.service.js'
import postsModule from './posts'

// include Vuex in Vue
Vue.use(Vuex)

// initialize app state here?
const state = {
  isAuthenticated: false
}

// store accepts a json object which is the state
const store = new Vuex.Store({
  modules: {
    postsModule
  },
  state,
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    }
  },
  actions: {
    logout (context) {
      context.commit('logout')
    },
    login (context, credentials) {
      return new Promise((resolve) => {
        appService.login(credentials)
          .then((data) => {
            context.commit('login', data) // mutation
            resolve()
          })
          .catch(() => window.alert('Could not login!'))
      })
    }
  },
  mutations: {
    logout (state) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', null)
        window.localStorage.setItem('tokenExpiration', null)
      }
      state.isAuthenticated = false
    },
    login (state, token) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', token.token)
        window.localStorage.setItem('tokenExpiration', token.expiration)
      }
      state.isAuthenticated = true
    }
  }
})

// determine if user is already logged in on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function (event) {
    let expiration = window.localStorage.getItem('tokenExpiration')
    let unixTimestamp = new Date().getTime() / 1000
    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
      // instructor wrote this but not supposed to update state directly???
      store.state.isAuthenticated = true
    }
  })
}

export default store
