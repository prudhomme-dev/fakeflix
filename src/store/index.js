import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: '881d31bce175d790fb1a46ef9002cbfd',
    searchWord: '',
    searchResult: []
  },
  getters: {},
  mutations: {
    searchWordChange(state, searchWord) {
      state.searchWord = searchWord;
    }
  },
  actions: {},
  modules: {}
})