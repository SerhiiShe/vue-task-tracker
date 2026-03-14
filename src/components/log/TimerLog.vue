<script setup lang="ts">
import { ref } from 'vue'
import { TimerLog, Time } from '@/types'
import { formatTimeString } from '@/utils/formatTimeString'
import BaseButton from '../ui/BaseButton.vue'

interface Props {
  log: TimerLog
}

defineOptions({
  name: 'TimerLog'
})

const props = defineProps<Props>()

const isEditPanelOpen = ref<boolean>(false)

const emit = defineEmits<{
  deleteLog: [logId: string]
  editLog: [logId: string, time: Time]
}>()

const editedTime = {
  hours: props.log.time.hours,
  minutes: props.log.time.minutes,
  seconds: props.log.time.seconds,
}

</script>

<template>
  <div class="border border-gray-200 rounded-lg p-3 bg-gray-50 space-y-3">

    <!-- log header -->
    <div class="flex items-center justify-between gap-3">

      <p class="text-sm font-medium text-gray-800 tabular-nums">
        {{ `${log.time.hours}:${formatTimeString(log.time.minutes)}:${formatTimeString(log.time.seconds)}` }}
      </p>

      <div class="flex gap-2">
        <BaseButton @action="emit('deleteLog', log.id)">
          Delete
        </BaseButton>

        <BaseButton @action="isEditPanelOpen = !isEditPanelOpen">
          {{ isEditPanelOpen ? 'Close' : 'Edit' }}
        </BaseButton>
      </div>

    </div>

    <!-- edit panel -->
    <div v-if="isEditPanelOpen" class="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200">

      <input type="number" min="0" v-model="editedTime.hours" class="w-16 border border-gray-200 rounded-lg px-2 py-1
               text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <span class="text-gray-400">:</span>

      <input type="number" min="0" max="59" v-model="editedTime.minutes" class="w-16 border border-gray-200 rounded-lg px-2 py-1
               text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <span class="text-gray-400">:</span>

      <input type="number" min="0" max="59" v-model="editedTime.seconds" class="w-16 border border-gray-200 rounded-lg px-2 py-1
               text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <BaseButton @action="emit('editLog', log.id, editedTime)">
        Save
      </BaseButton>

    </div>

  </div>
</template>

<style scoped></style>
