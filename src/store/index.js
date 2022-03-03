import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrlApi: `${process.env.VUE_APP_URL_API}${process.env.VUE_APP_VERSION_API}/`,
    apiKey: process.env.VUE_APP_API_KEY,
    tokenId: '',
    tokenExpired_At: '',
    sessionId: '',
    accountId: '',
    accountName: '',
    searchWord: '',
    favoriteMovie: [],
    watchList: []
  },
  getters: {

  },
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
  actions: {

    //TODO : mettre tous fetch la dedans



  }
})