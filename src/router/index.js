import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetail from '../views/MovieDetail.vue'
import WatchMovie from '../views/WatchMovie.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/fav',
    name: 'fav',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/FavoriteMovie.vue')
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: MovieDetail
  },
  {
    path: '/watch',
    name: 'watchmovie',
    component: WatchMovie
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router