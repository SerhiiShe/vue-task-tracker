import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'TaskList',
    component: () => import('@/App.vue'),
    meta: {
      layout: 'base',
      auth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: 'auth',
      auth: false,
    },
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/auth/SignUpView.vue'),
    meta: {
      layout: 'auth',
      auth: false,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(), // GitHub Pages
  routes,
})

export default router
