<script setup lang="ts">
import BaseFooter from '@/components/footer/BaseFooter.vue';
import BaseHeader from '@/components/header/BaseHeader.vue';

defineOptions({
  name: 'BaseLayout'
})
</script>

<template>
  <div class="h-screen flex flex-col">
    <BaseHeader />
    <main>
      <router-view />
    </main>
    <BaseFooter />
  </div>
</template>

<style scoped></style>