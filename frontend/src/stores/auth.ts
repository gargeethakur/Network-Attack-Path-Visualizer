import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/utils/api'

export interface User {
  id: string
  email: string
  full_name: string | null
  plan: 'free' | 'pro' | 'team'
  is_verified: boolean
  created_at: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user  = ref<User | null>(null)

  const isLoggedIn = computed(() => !!token.value)
  const isPro      = computed(() => user.value?.plan === 'pro' || user.value?.plan === 'team')

  async function login(email: string, password: string) {
    const { data } = await api.post('/api/v1/auth/login', { email, password })
    token.value = data.access_token
    localStorage.setItem('token', data.access_token)
    await fetchMe()
  }

  async function register(email: string, password: string, full_name?: string) {
    await api.post('/api/v1/auth/register', { email, password, full_name })
    await login(email, password)
  }

  async function fetchMe() {
    const { data } = await api.get('/api/v1/users/me')
    user.value = data
  }

  function logout() {
    token.value = null
    user.value  = null
    localStorage.removeItem('token')
  }

  return { token, user, isLoggedIn, isPro, login, register, fetchMe, logout }
})
