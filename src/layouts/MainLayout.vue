<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

defineOptions({
  name: 'MainLayout'
})

const authStore = useAuthStore()
</script>

<template>
  <div class="h-screen flex flex-col">
    <main class="py-40">
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>