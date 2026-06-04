<template>
  <div>
    <div class="mb-8">
      <p class="text-gray-500 text-sm mb-1">Manage your account</p>
      <h1 class="text-2xl font-semibold text-white">Settings</h1>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <!-- Left nav -->
      <div class="col-span-1">
        <nav class="space-y-1">
          <button v-for="tab in tabs" :key="tab"
            @click="activeTab = tab"
            class="w-full text-left px-3 py-2 rounded-lg text-sm transition"
            :class="activeTab === tab
              ? 'bg-indigo-600/20 text-indigo-400'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'">
            {{ tab }}
          </button>
        </nav>
      </div>

      <!-- Right content -->
      <div class="col-span-2">

        <!-- Profile -->
        <div v-if="activeTab === 'Profile'" class="bg-[#141820] border border-white/5 rounded-xl p-6 space-y-4">
          <h2 class="text-sm font-medium text-white mb-2">Profile information</h2>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Full name</label>
            <input v-model="form.fullName"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Email address</label>
            <input v-model="form.email" disabled
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed" />
          </div>
          <div class="pt-2">
            <button @click="saved = true" class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition">
              Save changes
            </button>
            <span v-if="saved" class="ml-3 text-xs text-green-400">✓ Saved</span>
          </div>
        </div>

        <!-- Password -->
        <div v-if="activeTab === 'Password'" class="bg-[#141820] border border-white/5 rounded-xl p-6 space-y-4">
          <h2 class="text-sm font-medium text-white mb-2">Change password</h2>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Current password</label>
            <input type="password" v-model="form.currentPassword"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">New password</label>
            <input type="password" v-model="form.newPassword"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Confirm new password</label>
            <input type="password" v-model="form.confirmPassword"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <button class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition">
            Update password
          </button>
        </div>

        <!-- Notifications -->
        <div v-if="activeTab === 'Notifications'" class="bg-[#141820] border border-white/5 rounded-xl p-6">
          <h2 class="text-sm font-medium text-white mb-4">Notification preferences</h2>
          <div class="space-y-4">
            <div v-for="notif in notifications" :key="notif.label"
              class="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <p class="text-sm text-white">{{ notif.label }}</p>
                <p class="text-xs text-gray-500">{{ notif.description }}</p>
              </div>
              <button @click="notif.enabled = !notif.enabled"
                class="w-10 h-5 rounded-full transition-colors relative"
                :class="notif.enabled ? 'bg-indigo-600' : 'bg-white/10'">
                <span class="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all"
                  :class="notif.enabled ? 'left-5' : 'left-0.5'"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Danger zone -->
        <div v-if="activeTab === 'Danger zone'" class="bg-[#141820] border border-red-500/20 rounded-xl p-6">
          <h2 class="text-sm font-medium text-red-400 mb-4">Danger zone</h2>
          <div class="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p class="text-sm text-white">Delete account</p>
              <p class="text-xs text-gray-500">Permanently delete your account and all data.</p>
            </div>
            <button class="text-sm px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition">
              Delete account
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const activeTab = ref('Profile')
const saved = ref(false)
const tabs = ['Profile', 'Password', 'Notifications', 'Danger zone']

const form = ref({
  fullName: auth.user?.full_name || '',
  email: auth.user?.email || '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const notifications = ref([
  { label: 'Email notifications',  description: 'Receive updates and alerts via email', enabled: true  },
  { label: 'API usage alerts',     description: 'Notify when approaching plan limits',  enabled: true  },
  { label: 'Billing reminders',    description: 'Upcoming invoice and payment notices', enabled: true  },
  { label: 'Product updates',      description: 'New features and announcements',       enabled: false },
])
</script>