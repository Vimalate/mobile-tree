import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token'),
    user: JSON.parse(sessionStorage.getItem('user')),  //用户信息
    personList:[]
  },
  mutations: {
    token (state, payload) {
      state.token = payload
    },
    user (state, payload) {
      state.user = payload
    },
    SET_PERSONLIST(state,payload){
      state.personList=payload
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
