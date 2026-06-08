<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <p class="text-gray-500 text-sm mb-1">Good morning 👋</p>
        <h1 class="text-2xl font-semibold text-white">
          Welcome back, {{ auth.user?.full_name || auth.user?.email?.split('@')[0] }}
        </h1>
      </div>
      <span class="text-xs px-3 py-1 rounded-full font-medium border" :class="planBadgeClass">
        {{ auth.user?.plan }} plan
      </span>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-3 gap-4 mb-8">
      <div v-for="card in statCards" :key="card.label"
        class="bg-[#141820] border border-white/5 rounded-xl p-5 hover:border-white/10 transition">
        <div class="flex items-center justify-between mb-3">
          <p class="text-gray-400 text-sm">{{ card.label }}</p>
          <span class="text-xl">{{ card.icon }}</span>
        </div>
        <p class="text-3xl font-semibold text-white">{{ card.value }}</p>
        <p class="text-xs mt-1" :class="card.up ? 'text-green-400' : 'text-gray-500'">{{ card.change }}</p>
      </div>
    </div>

    <!-- Upgrade banner -->
    <div v-if="auth.user?.plan === 'free'"
      class="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-xl p-5 flex items-center justify-between mb-8">
      <div>
        <p class="font-semibold text-white mb-1">Upgrade to Pro</p>
        <p class="text-sm text-gray-400">Unlock unlimited projects, advanced analytics, and priority support.</p>
      </div>
      <RouterLink to="/billing"
        class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-5 py-2.5 rounded-lg transition font-medium whitespace-nowrap ml-6">
        View plans →
      </RouterLink>
    </div>

    <!-- Recent activity -->
    <div class="bg-[#141820] border border-white/5 rounded-xl p-5">
      <h2 class="text-sm font-medium text-white mb-4">Recent activity</h2>
      <div class="space-y-1">
        <div v-for="item in activity" :key="item.text"
          class="flex items-center gap-4 py-2.5 border-b border-white/5 last:border-0">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" :class="item.bg">
            {{ item.icon }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-white">{{ item.text }}</p>
            <p class="text-xs text-gray-500">{{ item.time }}</p>
          </div>
          <span class="text-xs px-2 py-0.5 rounded-full" :class="item.tagClass">{{ item.tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const planBadgeClass = computed(() => ({
  'border-gray-600 text-gray-400':     auth.user?.plan === 'free',
  'border-indigo-500 text-indigo-400': auth.user?.plan === 'pro',
  'border-purple-500 text-purple-400': auth.user?.plan === 'team',
}))

const statCards = [
  { label: 'Projects',     icon: '📁', value: '3',    change: '+1 this month',     up: true  },
  { label: 'API calls',    icon: '⚡', value: '1.2k', change: '+18% vs last week', up: true  },
  { label: 'Team members', icon: '👥', value: '1',    change: 'Free plan limit',   up: false },
]

const activity = [
  { icon: '✓', bg: 'bg-green-500/10 text-green-400',   text: 'Account created successfully', time: 'Just now',  tag: 'Auth',    tagClass: 'bg-green-500/10 text-green-400'   },
  { icon: '⚡', bg: 'bg-indigo-500/10 text-indigo-400', text: 'First API request made',       time: '2 min ago', tag: 'API',     tagClass: 'bg-indigo-500/10 text-indigo-400' },
  { icon: '📁', bg: 'bg-blue-500/10 text-blue-400',    text: 'Default project initialized',  time: '5 min ago', tag: 'Project', tagClass: 'bg-blue-500/10 text-blue-400'     },
]
</script>
