import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import RegisterDriver from '../views/DriverRegister.vue'
import Orders from '../views/Order.vue'
import Meeting from '../views/Meeting.vue'

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
    path: '/user/:id/registerDriver',
    name: 'RegisterDriver',
    meta:{requireAuth:true},
    component: RegisterDriver
  },
  {
    path: '/user/:id/orders',
    name: 'Orders',
    meta:{requireAuth:true},
    component:Orders
  },
  {
    path: '/user/:id/meeting',
    name: 'Meeting',
    meta:{requireAuth:true},
    component:Meeting
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
