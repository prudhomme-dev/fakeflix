import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Debounce from 'debounce'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Debounce,
  render: h => h(App)
}).$mount('#app')