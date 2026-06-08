<template>
  <div>
    <div class="mb-8">
      <p class="text-gray-500 text-sm mb-1">Manage your subscription</p>
      <h1 class="text-2xl font-semibold text-white">Billing</h1>
    </div>

    <!-- Current plan -->
    <div class="bg-[#141820] border border-white/5 rounded-xl p-6 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-500 mb-1">Current plan</p>
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-semibold text-white capitalize">{{ auth.user?.plan }} Plan</h2>
            <span class="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">Active</span>
          </div>
          <p class="text-sm text-gray-500 mt-1">
            {{ auth.user?.plan === 'free' ? 'Free forever — upgrade to unlock more.' : 'Next billing date: June 27, 2026' }}
          </p>
        </div>
        <div class="text-right">
          <p class="text-3xl font-semibold text-white">
            ${{ auth.user?.plan === 'free' ? '0' : auth.user?.plan === 'pro' ? '19' : '49' }}
            <span class="text-sm font-normal text-gray-500">/mo</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Plans -->
    <div class="grid grid-cols-3 gap-4 mb-8">
      <div v-for="plan in plans" :key="plan.id"
        class="bg-[#141820] border rounded-xl p-5 flex flex-col transition"
        :class="plan.id === auth.user?.plan
          ? 'border-indigo-500/50'
          : plan.featured ? 'border-white/10' : 'border-white/5'">
        <div v-if="plan.featured" class="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full w-fit mb-3">
          Most popular
        </div>
        <p class="font-semibold text-white mb-1">{{ plan.name }}</p>
        <p class="text-2xl font-semibold text-white mb-1">
          ${{ plan.price }}<span class="text-sm font-normal text-gray-500">/mo</span>
        </p>
        <p class="text-xs text-gray-500 mb-4">{{ plan.description }}</p>
        <ul class="space-y-2 mb-5 flex-1">
          <li v-for="f in plan.features" :key="f" class="flex items-center gap-2 text-xs text-gray-400">
            <span class="text-green-400">✓</span> {{ f }}
          </li>
        </ul>
        <button
          :disabled="plan.id === auth.user?.plan"
          @click="checkout(plan.id)"
          class="w-full py-2 rounded-lg text-sm font-medium transition"
          :class="plan.id === auth.user?.plan
            ? 'bg-white/5 text-gray-500 cursor-default'
            : plan.featured
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
              : 'border border-white/10 hover:bg-white/5 text-gray-300'">
          {{ plan.id === auth.user?.plan ? 'Current plan' : 'Upgrade' }}
        </button>
      </div>
    </div>

    <!-- Invoice history -->
    <div class="bg-[#141820] border border-white/5 rounded-xl p-5">
      <h2 class="text-sm font-medium text-white mb-4">Invoice history</h2>
      <div v-if="auth.user?.plan === 'free'" class="text-center py-8">
        <p class="text-gray-500 text-sm">No invoices yet — you're on the free plan.</p>
      </div>
      <div v-else class="space-y-2">
        <div v-for="inv in invoices" :key="inv.id"
          class="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
          <div>
            <p class="text-sm text-white">{{ inv.description }}</p>
            <p class="text-xs text-gray-500">{{ inv.date }}</p>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm text-white">${{ inv.amount }}</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">Paid</span>
            <button class="text-xs text-indigo-400 hover:text-indigo-300 transition">Download</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import api from '@/utils/api'

const auth = useAuthStore()

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

const invoices = [
  { id: 1, description: 'Pro Plan — May 2026',   date: 'May 1, 2026',   amount: '19.00' },
  { id: 2, description: 'Pro Plan — April 2026', date: 'Apr 1, 2026',   amount: '19.00' },
  { id: 3, description: 'Pro Plan — March 2026', date: 'Mar 1, 2026',   amount: '19.00' },
]

async function checkout(plan: string) {
  try {
    const { data } = await api.post(`/api/v1/billing/checkout/${plan}`)
    window.location.href = data.url
  } catch {
    alert('Please configure Stripe to upgrade.')
  }
}
</script>