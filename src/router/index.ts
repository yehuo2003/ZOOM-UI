import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Icon from '../views/Icon.vue'
import date from '../views/date.vue'
import photoUI from '../views/photoUI.vue'
import layou from '../views/layou.vue'
import data from '../views/data.vue'
import tabtest from '../views/tabtest.vue'
import layout from '../views/layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Icon',
    name: 'Icon',
    component: Icon
  },
  {
    path: '/photoUI',
    name: 'photoUI',
    component: photoUI
  },
  {
    path: '/date',
    name: 'date',
    component: date
  },
  {
    path: '/tab',
    name: 'tabtest',
    component: tabtest
  },
  {
    path: '/layou',
    name: 'layou',
    component: layou
  },
  {
    path: '/layout',
    name: 'layout',
    component: layout
  },
  {
    path: '/data',
    name: 'data',
    component: data
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
