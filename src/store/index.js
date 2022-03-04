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
    watchList: [],
    discoverMovie: [],
    adultContent: false,
    loading: false,
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
      state.adultContent = accountinfo.include_adult;
    },
    resetSession(state) {
      state.sessionId = '';
      state.tokenId = '';
      state.tokenExpired_At = '';
      state.accountId = '';
      state.accountName = '';
      state.favoriteMovie = [];
      state.watchList = [];
      state.adultContent = false;
    },
    watchListUpdate(state, data) {
      state.watchList = data;
    },
    FavoriteUpdate(state, data) {
      state.favoriteMovie = data;
    },
    discoverUpdate(state, data) {
      state.discoverMovie = data;
    },
    loadingUpdate(state, status) {
      state.loading = status;

    }

  },
  actions: {

    //TODO : mettre tous fetch la dedans
    searchWatch: async function (context) {
      try {
        let response = await fetch(
          `${context.state.baseUrlApi}account/${context.state.accountId}/watchlist/movies?api_key=${context.state.apiKey}&session_id=${context.state.sessionId}&language=fr-FR&sort_by=created_at.desc`
        );
        let watchmovies = await response.json();
        context.commit("watchListUpdate", watchmovies.results)
      } catch (e) {
        console.error("ERREUR", e);
      }
    },
    searchFavorite: async function (context) {
      try {
        let response = await fetch(
          `${context.state.baseUrlApi}account/${context.state.accountId}/favorite/movies?api_key=${context.state.apiKey}&session_id=${context.state.sessionId}&language=fr-FR&sort_by=created_at.desc`
        );
        let favorites = await response.json();
        context.commit("FavoriteUpdate", favorites.results)
      } catch (e) {
        console.error("ERREUR", e);
      }
    },
    discoverMovie: async function (context) {
      try {
        let response = await fetch(
          `${context.state.baseUrlApi}discover/movie?api_key=${context.state.apiKey}&language=fr-FR`
        );
        let movies = await response.json();
        context.commit("discoverUpdate", movies.results)
      } catch (e) {
        console.error("ERREUR", e);
      }
    },

  }
})