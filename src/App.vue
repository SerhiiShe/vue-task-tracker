<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/task'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/layouts/AuthLayout.vue'
import BaseLayout from '@/layouts/BaseLayout.vue'

defineOptions({
  name: 'App'
})

const route = useRoute()
const taskStore = useTaskStore()
const authStore = useAuthStore()

const layoutMap = {
  base: BaseLayout,
  auth: AuthLayout
} as const

type LayoutKey = keyof typeof layoutMap

const viewLayout = computed(() => {
  const layout = route.meta.layout

  if (typeof layout === 'string' && layout in layoutMap) {
    return layoutMap[layout as LayoutKey]
  }

  return BaseLayout
})

onMounted(async () => {
  if (authStore.isAuth) {
    await taskStore.loadTasks()
  }
})
</script>

<template>
  <component :is="viewLayout" />
</template>

<style scoped></style>
