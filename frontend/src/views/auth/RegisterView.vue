<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-sm bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
      <h1 class="text-xl font-semibold mb-6 text-gray-900">Create account</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1">Name</label>
          <input v-model="fullName" type="text"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Email</label>
          <input v-model="email" type="email" required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Password</label>
          <input v-model="password" type="password" required minlength="8"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <button type="submit" :disabled="loading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 text-sm font-medium transition disabled:opacity-50">
          {{ loading ? 'Creating account…' : 'Get started' }}
        </button>
      </form>

      <p class="mt-4 text-sm text-center text-gray-500">
        Already have an account?
        <RouterLink to="/login" class="text-indigo-600 hover:underline">Sign in</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth   = useAuthStore()
const router = useRouter()

const fullName = ref('')
const email    = ref('')
const password = ref('')
const loading  = ref(false)
const error    = ref('')

async function handleRegister() {
  loading.value = true
  error.value   = ''
  try {
    await auth.register(email.value, password.value, fullName.value || undefined)
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e?.response?.data?.detail ?? 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>
