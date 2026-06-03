<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
    <h1 class="text-3xl font-semibold text-gray-900 mb-2">Simple pricing</h1>
    <p class="text-gray-500 mb-12 text-sm">Start free, upgrade when you're ready.</p>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
      <div v-for="plan in plans" :key="plan.id"
        class="bg-white rounded-xl border p-6 flex flex-col"
        :class="plan.featured ? 'border-indigo-400 ring-2 ring-indigo-200' : 'border-gray-200'">
        <div v-if="plan.featured" class="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full w-fit mb-3">
          Most popular
        </div>
        <p class="font-semibold text-gray-900 mb-1">{{ plan.name }}</p>
        <p class="text-3xl font-semibold text-gray-900 mb-1">
          ${{ plan.price }}<span class="text-sm font-normal text-gray-400">/mo</span>
        </p>
        <p class="text-sm text-gray-500 mb-5">{{ plan.description }}</p>
        <ul class="space-y-2 mb-6 flex-1">
          <li v-for="f in plan.features" :key="f" class="flex items-center gap-2 text-sm text-gray-700">
            <span class="text-green-500 font-bold">✓</span> {{ f }}
          </li>
        </ul>
        <button v-if="plan.id !== 'free'" @click="checkout(plan.id)" :disabled="checkingOut === plan.id"
          class="w-full py-2 rounded-lg text-sm font-medium transition"
          :class="plan.featured
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
            : 'border border-gray-300 hover:bg-gray-50 text-gray-800'">
          {{ checkingOut === plan.id ? 'Redirecting…' : 'Get started' }}
        </button>
        <RouterLink v-else to="/register"
          class="w-full py-2 rounded-lg text-sm font-medium text-center border border-gray-300 hover:bg-gray-50 text-gray-800">
          Get started free
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/utils/api'

const checkingOut = ref<string | null>(null)

const plans = [
  {
    id: 'free', name: 'Free', price: 0, featured: false,
    description: 'For personal projects.',
    features: ['1 project', '1k API calls/mo', 'Community support'],
  },
  {
    id: 'pro', name: 'Pro', price: 19, featured: true,
    description: 'For professionals.',
    features: ['Unlimited projects', '100k API calls/mo', 'Priority support', 'Advanced analytics'],
  },
  {
    id: 'team', name: 'Team', price: 49, featured: false,
    description: 'For growing teams.',
    features: ['Everything in Pro', 'Up to 10 seats', 'SSO / SAML', 'SLA guarantee'],
  },
]

async function checkout(plan: string) {
  checkingOut.value = plan
  try {
    const { data } = await api.post(`/api/v1/billing/checkout/${plan}`)
    window.location.href = data.url
  } catch {
    alert('Please sign in to upgrade.')
  } finally {
    checkingOut.value = null
  }
}
</script>
