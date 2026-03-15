<script setup lang="ts">
import { ref, computed } from 'vue'
import { Task, TASK_STATUS, TaskStatus } from '@/types'
import { useTaskStore } from '@/stores/task'
import { formatTimeObject } from '@/utils/formatTimeObject'
import { formatTimeString } from '@/utils/formatTimeString'
import { convertTimeToMs } from '@/utils/convertTimeToMs'
import TimerLog from '@/components/log/TimerLog.vue'
import BaseButton from '../ui/BaseButton.vue'

interface Props {
  task: Task
}

defineOptions({
  name: 'TaskItem'
})

const props = defineProps<Props>()

const taskStore = useTaskStore()
const editedName = props.task.name
const isChangePanelOpen = ref<boolean>(false)
const isLogsPanelOpen = ref<boolean>(false)

const totalTime = computed(() => {
  if (props.task.logs) {
    const totalMs = props.task.logs.reduce(
      (acc, log) => acc + convertTimeToMs(log.time),
      0
    )

    return formatTimeObject(totalMs)
  } else {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }
})

function isTaskStatus(value: string): value is TaskStatus {
  return Object.values(TASK_STATUS).includes(value as TaskStatus)
}

function handleChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  if (isTaskStatus(value)) {
    taskStore.editStatus(props.task.id, value)
  }
}

</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-4">

    <!-- header -->
    <div class="flex items-start justify-between gap-3">

      <h3 class="text-base font-semibold text-gray-800">
        {{ task.name }}
      </h3>
      <div>
        <p class="pb-1">Status:</p>
        <select :value="task.status" @change="handleChange" class="text-sm border border-gray-200 rounded-lg px-2 py-1
                 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option v-for="status in TASK_STATUS" :value="status">
            {{ status }}
          </option>
        </select>
      </div>

    </div>

    <!-- total time -->
    <p class="text-sm text-gray-600 font-medium tabular-nums">
      Total time:
      {{ `${totalTime.hours}:${formatTimeString(totalTime.minutes)}:${formatTimeString(totalTime.seconds)}` }}
    </p>

    <!-- main actions -->
    <div class="flex flex-wrap gap-2">

      <BaseButton v-if="taskStore.currentTimer?.taskId !== task.id" @action="taskStore.startTimer(task.id)">
        Start
      </BaseButton>

      <BaseButton v-if="taskStore.currentTimer?.taskId === task.id" @action="taskStore.stopTimer()">
        Stop
      </BaseButton>

      <BaseButton @action="taskStore.deleteTask(task.id)">
        Delete
      </BaseButton>

    </div>

    <!-- panel toggles -->
    <div class="flex gap-2">

      <BaseButton @action="isChangePanelOpen = !isChangePanelOpen">
        {{ isChangePanelOpen ? 'Close edit panel' : 'Edit name' }}
      </BaseButton>

      <BaseButton @action="isLogsPanelOpen = !isLogsPanelOpen">
        {{ isLogsPanelOpen ? 'Close logs' : 'Logs' }}
      </BaseButton>

    </div>

    <!-- change panel -->
    <div v-if="isChangePanelOpen" class="flex flex-col sm:flex-row gap-2">
      <input type="text" v-model="editedName" class="flex-1 border border-gray-200 rounded-lg px-3 py-2
               focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <BaseButton @action="taskStore.editTaskName(task.id, editedName)">
        Save
      </BaseButton>
    </div>

    <!-- logs -->
    <div v-if="isLogsPanelOpen" class="space-y-2 pt-2 border-t border-gray-100">
      <TimerLog v-if="task.logs?.length" v-for="log in task.logs" :key="log.id" :log="log"
        @delete-log="(logId) => taskStore.deleteLog(task.id, logId)"
        @edit-log="(logId, editedTime) => taskStore.editLog(task.id, logId, editedTime)" />
      <p v-else>You haven't worked on this task yet.</p>
    </div>

  </div>
</template>

<style scoped></style>
