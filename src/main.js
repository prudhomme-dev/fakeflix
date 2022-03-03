import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Debounce from 'debounce'
import {
  Hooper,
  Slide
} from 'hooper';
import 'hooper/dist/hooper.css';

import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.css';

Vue.use(VueIziToast);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueIziToast,
  Hooper,
  Slide,
  Debounce,
  render: h => h(App)
}).$mount('#app')