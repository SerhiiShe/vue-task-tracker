<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/stores/task'
import TaskItem from '@/components/task/TaskItem.vue'
import TimerCounter from '@/components/timer/TimerCounter.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

defineOptions({
  name: 'TaskListView'
})

const taskStore = useTaskStore()
const name = ref<string>('')

const createTask = async () => {
  if (name.value === '') return

  await taskStore.createTask({
    name: name.value,
    status: 'active'
  })

  name.value = ''
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-6 space-y-6">

    <!-- create task -->
    <form @submit.prevent="createTask" class="flex gap-2 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <input type="text" name="name" v-model="name" placeholder="New task name..." class="flex-1 border border-gray-200 rounded-lg px-3 py-2
               text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <BaseButton type="submit">
        Create
      </BaseButton>
    </form>

    <!-- tasks list -->
    <div class="space-y-4">

      <TaskItem v-for="task in taskStore.tasks" :key="task.id" :task="task" />

    </div>

    <!-- floating timer -->
    <TimerCounter />

  </div>
</template>

<style scoped></style>
