<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/stores/task';
import AuthLayout from '@/layouts/AuthLayout.vue';

defineOptions({
  name: 'App'
})

const taskStore = useTaskStore()
const name = ref<string>('')

const createTask = async () => {
  if (name.value === '') return

  await taskStore.createTask({
    id: String(Math.random()),
    name: name.value,
    logs: []
  })

  name.value = ''
}
</script>

<template>
  <form @submit.prevent="createTask">
    <input type="text" name="name" v-model="name">
    <button type="submit">Create</button>
  </form>
  <div v-for="task in taskStore.tasks" :key="task.id">
    <h3>{{ task.name }}</h3>
    <p>{{ task.id }}</p>
    <button @click="taskStore.deleteTask(task.id)">Delete Task</button>
  </div>
  <AuthLayout />
</template>

<style scoped></style>
