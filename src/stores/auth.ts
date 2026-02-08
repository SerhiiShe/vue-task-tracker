import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebase/config'
import router from '@/router'
import { AuthUser } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // state
  const user = ref<AuthUser>(null)

  // getters
  const uid = computed(() => user.value?.uid ?? null)
  const isAuth = computed(() => !!user.value)
  const email = computed(() => user.value?.email ?? null)

  // actions
  async function signUp(email: string, password: string): Promise<void> {
    try {
      const newUser = await authService.register(email, password)
      user.value = newUser
      router.push('/')
    } catch (e: unknown) {
      console.error('signUp failed', e)
      throw e
    }
  }

  async function login(email: string, password: string): Promise<void> {
    try {
      const newUser = await authService.signIn(email, password)
      user.value = newUser
      router.push('/')
    } catch (e: unknown) {
      console.error('login failed', e)
      throw e
    }
  }

  async function logout(): Promise<void> {
    try {
      await authService.logout()
      user.value = null
    } catch (e: unknown) {
      console.error('logout failed', e)
      throw e
    }
  }

  function init(): void {
    onAuthStateChanged(auth, (u) => {
      user.value = u
    })
  }

  return {
    user,
    uid,
    isAuth,
    email,
    signUp,
    login,
    logout,
    init,
  }
})
