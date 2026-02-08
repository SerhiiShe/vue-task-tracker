<script setup lang="ts">
defineOptions({
  name: 'AuthLayout'
})
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