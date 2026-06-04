<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <p class="text-gray-500 text-sm mb-1">Manage your work</p>
        <h1 class="text-2xl font-semibold text-white">Projects</h1>
      </div>
      <button @click="showModal = true"
        class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition font-medium flex items-center gap-2">
        + New project
      </button>
    </div>

    <!-- Projects grid -->
    <div class="grid grid-cols-3 gap-4">
      <div v-for="project in projects" :key="project.id"
        class="bg-[#141820] border border-white/5 rounded-xl p-5 hover:border-white/10 transition cursor-pointer group">
        <div class="flex items-start justify-between mb-4">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
            :style="{ background: project.color + '20' }">
            {{ project.icon }}
          </div>
          <span class="text-xs px-2 py-0.5 rounded-full"
            :class="project.status === 'Active'
              ? 'bg-green-500/10 text-green-400'
              : 'bg-gray-500/10 text-gray-400'">
            {{ project.status }}
          </span>
        </div>
        <h3 class="text-sm font-medium text-white mb-1">{{ project.name }}</h3>
        <p class="text-xs text-gray-500 mb-4">{{ project.description }}</p>
        <div class="flex items-center justify-between">
          <div class="flex -space-x-1">
            <div v-for="i in project.members" :key="i"
              class="w-5 h-5 rounded-full bg-indigo-500 border border-[#141820] flex items-center justify-center text-xs">
            </div>
          </div>
          <p class="text-xs text-gray-500">{{ project.updated }}</p>
        </div>
        <!-- Progress bar -->
        <div class="mt-3">
          <div class="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span><span>{{ project.progress }}%</span>
          </div>
          <div class="h-1 bg-white/5 rounded-full">
            <div class="h-1 rounded-full transition-all" :style="{ width: project.progress + '%', background: project.color }"></div>
          </div>
        </div>
      </div>

      <!-- New project card -->
      <div @click="showModal = true"
        class="bg-[#141820] border border-dashed border-white/10 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-500/5 transition min-h-[180px]">
        <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 text-xl mb-2">+</div>
        <p class="text-sm text-gray-500">New project</p>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50" @click.self="showModal = false">
      <div class="bg-[#141820] border border-white/10 rounded-xl p-6 w-full max-w-md">
        <h2 class="text-white font-semibold mb-4">New project</h2>
        <div class="space-y-3">
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Project name</label>
            <input v-model="newProject.name" placeholder="My awesome project"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Description</label>
            <textarea v-model="newProject.description" rows="2" placeholder="What is this project about?"
              class="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 resize-none" />
          </div>
        </div>
        <div class="flex gap-2 mt-5">
          <button @click="showModal = false"
            class="flex-1 py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:bg-white/5 transition">Cancel</button>
          <button @click="createProject"
            class="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/utils/api'

const showModal = ref(false)
const newProject = ref({ name: '', description: '' })
const projects = ref([])
const loading = ref(true)

onMounted(async () => {
  const { data } = await api.get('/api/v1/projects/')
  projects.value = data
  loading.value = false
})

async function createProject() {
  if (!newProject.value.name.trim()) return
  const { data } = await api.post('/api/v1/projects/', newProject.value)
  projects.value.push({ ...data, icon: '📁', color: '#6366f1', members: 1, updated: 'Just now' })
  newProject.value = { name: '', description: '' }
  showModal.value = false
}

async function deleteProject(id: string) {
  await api.delete(`/api/v1/projects/${id}`)
  projects.value = projects.value.filter((p: any) => p.id !== id)
}
</script>