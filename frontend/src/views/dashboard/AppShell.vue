<template>
  <div class="min-h-screen bg-[#0f1117] text-white font-sans flex">

    <!-- Sidebar -->
    <aside class="fixed top-0 left-0 h-full w-56 bg-[#141820] border-r border-white/5 flex flex-col z-20">
      <div class="px-5 py-5 border-b border-white/5">
        <span class="text-white font-semibold tracking-tight text-lg">⚡ My SaaS</span>
      </div>
      <nav class="flex-1 px-3 py-4 space-y-1">
        <RouterLink v-for="item in navItems" :key="item.label" :to="item.path"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition"
          :class="$route.path.startsWith(item.path)
            ? 'bg-indigo-600/20 text-indigo-400'
            : 'text-gray-400 hover:bg-white/5 hover:text-white'">
          <span>{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="px-4 py-4 border-t border-white/5">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
            {{ initials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">{{ auth.user?.full_name || 'User' }}</p>
            <p class="text-xs text-gray-500 truncate">{{ auth.user?.email }}</p>
          </div>
        </div>
        <button @click="auth.logout(); router.push('/login')"
          class="w-full text-xs text-gray-500 hover:text-red-400 transition text-left px-1">
          Sign out →
        </button>
      </div>
    </aside>

    <!-- Page content -->
    <main class="ml-56 flex-1 p-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth   = useAuthStore()
const router = useRouter()

const initials = computed(() => {
  const name = auth.user?.full_name || auth.user?.email || 'U'
  return name.slice(0, 2).toUpperCase()
})

const navItems = [
  { label: 'Dashboard', icon: '▦', path: '/dashboard' },
  { label: 'Projects',  icon: '◈', path: '/projects'  },
  { label: 'Analytics', icon: '◎', path: '/analytics' },
  { label: 'Billing',   icon: '◇', path: '/billing'   },
  { label: 'Settings',  icon: '◉', path: '/settings'  },
]
</script>