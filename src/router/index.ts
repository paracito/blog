import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Details from '../views/Details.vue'
import About from '../views/About.vue'
import NewArticle from '../views/NewArticle.vue'
import Manage from '../views/Manage.vue'
import Login from '../views/Login.vue'
import List from '../views/List.vue'
import Infomation from '../views/Infomation.vue'
import Draft from '../views/Draft.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: About
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/details/:index',
    name: 'Details',
    component: Details
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage,
    children: [
      {
        path: 'list',
        name: 'List',
        component: List
      },
      {
        path: 'infomation',
        name: 'Infomation',
        component: Infomation
      },
      {
        path: 'add',
        name: 'Add',
        component: NewArticle
      },
      {
        path: 'draft',
        name: 'Draft',
        component: Draft
      },
      {
        path: 'modify/:type/:index?',
        name: 'Modify',
        component: NewArticle
      }
    ],
    beforeEnter: (to, from) => {
      if (localStorage.getItem('user') === '') {
        alert('管理员请登录！')
        return '/login'
      }
    }
  },
  {
    path: '/newArticle/:index?',
    name: 'NewArticle',
    component: NewArticle,
    beforeEnter: (to, from) => {
      if (localStorage.getItem('user') === '') {
        alert('管理员请登录！')
        return '/login'
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
