import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Task, CurrentTimer } from '@/types'

export const useTaskStore = defineStore('task', () => {
  // state
  const tasks = ref<Task[]>([])
  const currentTimer = ref<null | CurrentTimer>(
    localStorage.getItem('currentTimer') as CurrentTimer | null,
  )

  // getters

  // actions
  async function createTask(task: Task): Promise<void> {
    await tasks.value.unshift(task)
  }

  function deleteTask(taskId: string): void {
    tasks.value = tasks.value.filter((task) => task.id !== taskId)
  }

  function startTimer(taskId: string): void {
    const newTimer = {
      taskId: taskId,
      startTimestamp: Date.now(),
    }

    currentTimer.value = newTimer

    localStorage.setItem('currentTimer', JSON.stringify(newTimer))
  }

  function stopTimer(): void {
    if (currentTimer && currentTimer.value?.startTimestamp) {
      const currentTimestamp = Date.now()

      const calculatedTimestamp = currentTimestamp - currentTimer.value.startTimestamp

      const currentTaskIdx = tasks.value.findIndex((task) => task.id === currentTimer.value?.taskId)
      const currentTask = tasks.value[currentTaskIdx]

      currentTask?.logs.unshift({
        timestampStart: currentTimer.value.startTimestamp,
        timestampStop: currentTimestamp,
        timestampTime: calculatedTimestamp,
        time: 'string',
      })

      currentTimer.value = null

      localStorage.setItem('currentTimer', JSON.stringify(null))
    }
  }

  return { tasks, createTask, deleteTask }
})
