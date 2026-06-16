import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login',    component: () => import('@/views/auth/LoginView.vue'),    meta: { guest: true } },
    { path: '/register', component: () => import('@/views/auth/RegisterView.vue'), meta: { guest: true } },
    {
      path: '/',
      component: () => import('@/views/dashboard/AppShell.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: 'dashboard',  component: () => import('@/views/dashboard/DashboardView.vue') },
        { path: 'projects',   component: () => import('@/views/projects/ProjectsView.vue') },
        { path: 'analytics',  component: () => import('@/views/analytics/AnalyticsView.vue') },
        { path: 'billing',    component: () => import('@/views/billing/BillingView.vue') },
        { path: 'settings',   component: () => import('@/views/settings/SettingsView.vue') },
      ],
    },
    { path: '/pricing', component: () => import('@/views/PricingView.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFoundView.vue') },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) return '/login'
  if (to.meta.guest && auth.isLoggedIn) return '/dashboard'
  if (auth.isLoggedIn && !auth.user) {
    try { await auth.fetchMe() } catch { auth.logout() }
  }
})

export default router
