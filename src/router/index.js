import Vue from 'vue'
import VueRouter from 'vue-router'
import Discovery from '../views/discovery.vue'
import Playlists from '../views/playlists.vue'
import Songs from '../views/songs.vue'
import Mvs from '../views/mvs.vue'
import Result from '../views/result.vue'
import Playlist from '../views/playlist.vue'
import Mv from '../views/mv.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/discovery'
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/discovery',
    name: 'Discovery',
    component: Discovery
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: Playlists
  },
  {
    path: '/songs',
    component: Songs
  },
  {
    path: '/mvs',
    component: Mvs
  },
  //搜索结果
  {
    path:'/result',
    component: Result
  },
  {
    path:'/playlist',
    component:Playlist
  },
  {
    path:'mv',
    component:Mv
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
