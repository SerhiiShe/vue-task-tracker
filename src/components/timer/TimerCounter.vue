<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/task'
import { formatTimeString } from '@/utils/formatTimeString'
import { formatTimeObject } from '@/utils/formatTimeObject'
import BaseButton from '../ui/BaseButton.vue'


defineOptions({
  name: 'TimerCounter'
})

const taskStore = useTaskStore()

const time = computed(() => {
  if (taskStore.timerCounter !== null) {
    const timeObject = formatTimeObject(taskStore.timerCounter * 1000)
    return `${timeObject.hours}:${formatTimeString(timeObject.minutes)}:${formatTimeString(timeObject.seconds)}`
  } else {
    return null
  }
})

</script>

<template>
  <div v-if="time" class="fixed bottom-16 right-4 z-50
         flex items-center gap-3
         px-4 py-3
         bg-white
         rounded-xl
         shadow-lg
         border border-gray-200">
    <span class="font-medium text-gray-800 tabular-nums">
      {{ time }}
    </span>

    <BaseButton @action="taskStore.stopTimer">
      Stop
    </BaseButton>
  </div>
</template>

<style scoped></style>
