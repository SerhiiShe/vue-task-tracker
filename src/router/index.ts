import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'TaskList',
    component: () => import('@/views/task/TaskListView.vue'),
    meta: {
      layout: 'base',
      access: 'authOnly',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: 'auth',
      access: 'guestsOnly',
    },
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/auth/SignUpView.vue'),
    meta: {
      layout: 'auth',
      access: 'guestsOnly',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(), // GitHub Pages
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.access === 'guestsOnly' && authStore.isAuth) {
    return { name: 'TaskList' }
  }

  if (to.meta.access === 'authOnly' && !authStore.isAuth) {
    return { name: 'Login' }
  }

  return true
})

export default router
