import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: '881d31bce175d790fb1a46ef9002cbfd',
    tokenId: '',
    tokenExpired_At: '',
    sessionId: '',
    accountId: '',
    accountName: '',
    searchWord: ''
  },
  getters: {},
  mutations: {
    searchWordChange(state, searchWord) {
      state.searchWord = searchWord;
    },
    getToken(state, tokenInfo) {
      state.tokenId = tokenInfo.request_token;
      state.tokenExpired_At = tokenInfo.expires_at;
    },
    getSession(state, sessionInfo) {
      state.sessionId = sessionInfo.session_id;
    },
    getAccount(state, accountinfo) {
      state.accountId = accountinfo.id;
      state.accountName = accountinfo.name;
    },
    resetSession(state) {
      state.sessionId = '';
      state.tokenId = '';
      state.tokenExpired_At = '';
      state.accountId = '';
      state.accountName = '';
    }
  },
  actions: {},
  modules: {}
})