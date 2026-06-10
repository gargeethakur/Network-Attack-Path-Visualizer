<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <p class="text-gray-500 text-sm mb-1">Performance overview</p>
        <h1 class="text-2xl font-semibold text-white">Analytics</h1>
      </div>
      <select class="bg-[#141820] border border-white/10 text-gray-400 text-sm rounded-lg px-3 py-2 focus:outline-none">
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Last 90 days</option>
      </select>
    </div>

    <!-- Stat row -->
    <div class="grid grid-cols-4 gap-4 mb-8">
      <div v-for="stat in stats" :key="stat.label"
        class="bg-[#141820] border border-white/5 rounded-xl p-4">
        <p class="text-gray-400 text-xs mb-2">{{ stat.label }}</p>
        <p class="text-2xl font-semibold text-white">{{ stat.value }}</p>
        <p class="text-xs mt-1" :class="stat.up ? 'text-green-400' : 'text-red-400'">
          {{ stat.change }}
        </p>
      </div>
    </div>

    <!-- Chart area -->
    <div class="bg-[#141820] border border-white/5 rounded-xl p-5 mb-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-sm font-medium text-white">API calls over time</h2>
        <div class="flex gap-3">
          <button v-for="t in ['Day','Week','Month']" :key="t"
            class="text-xs px-3 py-1 rounded-lg transition"
            :class="activeTab === t ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-white'"
            @click="activeTab = t">{{ t }}</button>
        </div>
      </div>
      <!-- Bar chart -->
      <div class="flex items-end gap-2 h-40">
        <div v-for="(bar, i) in chartData" :key="i" class="flex-1 flex flex-col items-center gap-1">
          <div class="w-full rounded-t-md transition-all duration-500"
            :style="{ height: bar.height + '%', background: bar.height > 70 ? '#6366f1' : '#6366f130' }"
            :title="bar.value + ' calls'">
          </div>
          <span class="text-xs text-gray-600">{{ bar.label }}</span>
        </div>
      </div>
    </div>

    <!-- Two col -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Top endpoints -->
      <div class="bg-[#141820] border border-white/5 rounded-xl p-5">
        <h2 class="text-sm font-medium text-white mb-4">Top endpoints</h2>
        <div class="space-y-3">
          <div v-for="ep in endpoints" :key="ep.path" class="flex items-center gap-3">
            <span class="text-xs px-1.5 py-0.5 rounded font-mono font-medium"
              :class="ep.method === 'GET' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'">
              {{ ep.method }}
            </span>
            <span class="text-xs text-gray-300 font-mono flex-1">{{ ep.path }}</span>
            <span class="text-xs text-gray-500">{{ ep.calls }}</span>
            <div class="w-16 h-1 bg-white/5 rounded-full">
              <div class="h-1 bg-indigo-500 rounded-full" :style="{ width: ep.pct + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- Error rate -->
      <div class="bg-[#141820] border border-white/5 rounded-xl p-5">
        <h2 class="text-sm font-medium text-white mb-4">Response codes</h2>
        <div class="space-y-3">
          <div v-for="code in responseCodes" :key="code.code" class="flex items-center gap-3">
            <span class="text-xs font-mono font-medium w-10" :class="code.color">{{ code.code }}</span>
            <div class="flex-1 h-1.5 bg-white/5 rounded-full">
              <div class="h-1.5 rounded-full" :class="code.bar" :style="{ width: code.pct + '%' }"></div>
            </div>
            <span class="text-xs text-gray-500 w-8 text-right">{{ code.pct }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('Week')

const stats = [
  { label: 'Total API calls',   value: '1,243', change: '↑ 18% vs last week', up: true  },
  { label: 'Avg response time', value: '142ms', change: '↓ 12ms faster',      up: true  },
  { label: 'Error rate',        value: '0.8%',  change: '↑ 0.2% this week',   up: false },
  { label: 'Uptime',            value: '99.9%', change: 'Last 30 days',        up: true  },
]

const chartData = [
  { label: 'Mon', height: 40, value: 120 },
  { label: 'Tue', height: 65, value: 210 },
  { label: 'Wed', height: 55, value: 180 },
  { label: 'Thu', height: 80, value: 260 },
  { label: 'Fri', height: 95, value: 310 },
  { label: 'Sat', height: 45, value: 140 },
  { label: 'Sun', height: 30, value: 90  },
]

const endpoints = [
  { method: 'POST', path: '/api/v1/auth/login',    calls: '423', pct: 90 },
  { method: 'GET',  path: '/api/v1/users/me',      calls: '389', pct: 82 },
  { method: 'POST', path: '/api/v1/auth/register', calls: '201', pct: 43 },
  { method: 'GET',  path: '/api/v1/billing',       calls: '98',  pct: 21 },
]

const responseCodes = [
  { code: '200', color: 'text-green-400', bar: 'bg-green-500', pct: 91 },
  { code: '201', color: 'text-blue-400',  bar: 'bg-blue-500',  pct: 6  },
  { code: '400', color: 'text-amber-400', bar: 'bg-amber-500', pct: 2  },
  { code: '500', color: 'text-red-400',   bar: 'bg-red-500',   pct: 1  },
]
</script>