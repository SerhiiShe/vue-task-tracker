<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import BaseButton from '../ui/BaseButton.vue';

defineOptions({
  name: 'BaseHeader'
})

const authStore = useAuthStore()
</script>

<template>
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

      <!-- logo / title -->
      <h1 class="text-base font-semibold text-gray-800">
        Task Tracker
      </h1>

      <!-- navigation -->
      <nav class="flex items-center gap-2">

        <RouterLink v-if="authStore.isAuth" :to="{ name: 'TaskList' }">
          <BaseButton>
            Dashboard
          </BaseButton>
        </RouterLink>

        <RouterLink v-if="!authStore.isAuth" :to="{ name: 'Login' }">
          <BaseButton>
            Login
          </BaseButton>
        </RouterLink>

        <BaseButton v-if="authStore.isAuth" @action="authStore.logout()">
          Logout
        </BaseButton>

      </nav>

    </div>
  </header>
</template>

<style scoped></style>
