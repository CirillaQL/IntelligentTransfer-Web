import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Test from '../views/Test.vue'
import RegisterDriver from '../views/DriverRegister.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/user/:id/home',
    name: 'user',
    meta:{requireAuth:true},
    component: User
  },
  {
    path: '/test/:id',
    name: 'Test',
    meta:{requireAuth:true},
    component: Test
  },
  {
    path: '/user/:id/registerDriver',
    name: 'RegisterDriver',
    meta:{requireAuth:true},
    component: RegisterDriver
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
