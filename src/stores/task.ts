import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  TaskPayload,
  Task,
  CurrentTimerPayload,
  CurrentTimer,
  TimerLog,
  Time,
  TaskStatus,
} from '@/types'
import { firestoreService } from '@/services/firebase/firestore'
import { useAuthStore } from './auth'
import { formatTimeObject } from '@/utils/formatTimeObject'
import { convertTimeToMs } from '@/utils/convertTimeToMs'

export const useTaskStore = defineStore('task', () => {
  // state
  const tasks = ref<Task[]>([])
  const currentTimer = ref<CurrentTimer | null>(null)
  const now = ref<number | null>(null)
  const timerCounterId = ref<number | null>(null)

  // getters
  const timerCounter = computed(() => {
    if (currentTimer.value && now.value !== null)
      return Math.floor((now.value - currentTimer.value.startTimestamp) / 1000)
    return null
  })

  // actions
  async function createTask(task: TaskPayload): Promise<void> {
    try {
      const uid = getUid()

      const collectionPath = `users/${uid}/tasks`

      const docId: string = await firestoreService.addCollectionItem(collectionPath, task)

      tasks.value.unshift({
        id: docId,
        ...task,
      })
    } catch (error) {
      console.error('createTask failed:', error)
      throw error
    }
  }

  async function deleteTask(taskId: string): Promise<void> {
    try {
      const uid = getUid()

      const collectionPath = `users/${uid}/tasks/${taskId}`

      await firestoreService.deleteCollectionItem(collectionPath)

      tasks.value = tasks.value.filter((task) => task.id !== taskId)
    } catch (error) {
      console.error('deleteTask failed:', error)
      throw error
    }
  }

  async function editTaskName(taskId: string, name: string): Promise<void> {
    try {
      if (!name.trim()) return

      const uid = getUid()

      const collectionPath = `users/${uid}/tasks/${taskId}`

      await firestoreService.updateCollectionItem(collectionPath, { name })

      const currentTaskIdx = tasks.value.findIndex((task) => task.id === taskId)
      const currentTask = tasks.value[currentTaskIdx]

      if (!currentTask) {
        throw new Error('There is no currentTask in tasks')
      }

      currentTask.name = name
    } catch (error) {
      console.error('editLog failed:', error)
      throw error
    }
  }

  async function loadTasks(): Promise<void> {
    try {
      const uid = getUid()

      const collectionPath = `users/${uid}/tasks`

      const data: Task[] = await firestoreService.getCollectionItems(collectionPath)

      if (data) {
        tasks.value = data
        tasks.value.forEach(async (task) => loadTaskLogs(task, uid))
      }
    } catch (error) {
      console.error('loadTasks failed:', error)
      throw error
    }
  }

  async function startTimer(taskId: string): Promise<void> {
    try {
      const uid = getUid()

      const newTimer = {
        taskId: taskId,
        startTimestamp: Date.now(),
      }

      firestoreService.setCollectionItem(`users/${uid}`, {
        currentTimer: newTimer,
      })

      currentTimer.value = newTimer

      startTimerCounter()
    } catch (error) {
      console.error('startTimer failed:', error)
      throw error
    }
  }

  async function stopTimer(): Promise<void> {
    try {
      const uid = getUid()

      const data: CurrentTimerPayload | null = await firestoreService.getDocItem(`users/${uid}`)

      if (data && data.currentTimer) {
        createLog(data.currentTimer, uid)
      } else {
        throw new Error('There is no currentTimer in data')
      }

      await firestoreService.updateCollectionItem(`users/${uid}`, {
        currentTimer: null,
      })

      currentTimer.value = null

      stopTimerCounter()
    } catch (error) {
      console.error('stopTimer failed:', error)
      throw error
    }
  }

  async function loadTaskLogs(task: Task, uid: string): Promise<void> {
    try {
      const collectionPath = `users/${uid}/tasks/${task.id}/logs`

      const data: TimerLog[] = await firestoreService.getCollectionItems(collectionPath)

      task.logs = data
    } catch (error) {
      console.error('loadTaskLogs failed:', error)
      throw error
    }
  }

  async function createLog(currentTimer: CurrentTimer, uid: string): Promise<void> {
    try {
      const currentTimestamp = Date.now()

      const calculatedTimestamp = currentTimestamp - currentTimer.startTimestamp

      const currentTaskIdx = tasks.value.findIndex((task) => task.id === currentTimer.taskId)
      const currentTask = tasks.value[currentTaskIdx]

      if (!currentTask) {
        throw new Error('There is no currentTask in tasks')
      }

      const collectionPath = `users/${uid}/tasks/${currentTimer.taskId}/logs`

      const newLog = {
        timestampStart: currentTimer.startTimestamp,
        timestampStop: currentTimestamp,
        timestampTime: calculatedTimestamp,
        time: formatTimeObject(calculatedTimestamp),
      }

      const docId: string = await firestoreService.addCollectionItem(collectionPath, newLog)

      if (!currentTask.logs) {
        currentTask.logs = []
      }

      currentTask.logs.unshift({
        id: docId,
        ...newLog,
      })
    } catch (error) {
      console.error('createLog failed:', error)
      throw error
    }
  }

  async function deleteLog(taskId: string, logId: string): Promise<void> {
    try {
      const uid = getUid()

      const collectionPath = `users/${uid}/tasks/${taskId}/logs/${logId}`

      await firestoreService.deleteCollectionItem(collectionPath)

      const currentTaskIdx = tasks.value.findIndex((task) => task.id === taskId)
      const currentTask = tasks.value[currentTaskIdx]

      if (!currentTask) {
        throw new Error('There is no currentTask in tasks')
      }

      if (!currentTask.logs) {
        currentTask.logs = []
      }

      currentTask.logs = currentTask.logs.filter((log) => log.id !== logId)
    } catch (error) {
      console.error('deleteLog failed:', error)
      throw error
    }
  }

  async function editLog(taskId: string, logId: string, time: Time): Promise<void> {
    try {
      const uid = getUid()

      const timestampTime = convertTimeToMs(time)

      const collectionPath = `users/${uid}/tasks/${taskId}/logs/${logId}`

      await firestoreService.updateCollectionItem(collectionPath, {
        timestampTime,
        time,
      })

      const currentTaskIdx = tasks.value.findIndex((task) => task.id === taskId)
      const currentTask = tasks.value[currentTaskIdx]

      if (!currentTask) {
        throw new Error('There is no currentTask in tasks')
      }

      if (!currentTask.logs) {
        throw new Error('There is no logs in currentTask')
      }

      const currentLogIdx = currentTask.logs.findIndex((log) => log.id === logId)
      const currentLog = currentTask.logs[currentLogIdx]

      if (!currentLog) {
        throw new Error('There is no currentLog in logs')
      }

      currentLog.timestampTime = timestampTime
      currentLog.time = time
    } catch (error) {
      console.error('editLog failed:', error)
      throw error
    }
  }

  async function editStatus(taskId: string, status: TaskStatus): Promise<void> {
    try {
      const uid = getUid()

      const collectionPath = `users/${uid}/tasks/${taskId}`

      await firestoreService.updateCollectionItem(collectionPath, {
        status,
      })

      const currentTaskIdx = tasks.value.findIndex((task) => task.id === taskId)
      const currentTask = tasks.value[currentTaskIdx]

      if (!currentTask) {
        throw new Error('There is no currentTask in tasks')
      }

      currentTask.status = status
    } catch (error) {
      console.error('editStatus failed:', error)
      throw error
    }
  }

  function startTimerCounter() {
    if (timerCounterId.value !== null) return

    timerCounterId.value = window.setInterval(() => {
      now.value = Date.now()
    }, 1000)
  }

  function stopTimerCounter() {
    if (timerCounterId.value === null) return

    clearInterval(timerCounterId.value)
    timerCounterId.value = null
    now.value = null
  }

  function getUid(): string {
    const authStore = useAuthStore()
    const uid = authStore.uid

    if (!uid) {
      throw new Error('User is not authenticated')
    }

    return uid
  }

  function clearStoreData(): void {
    tasks.value = []
    currentTimer.value = null
    now.value = null
    timerCounterId.value = null
  }

  return {
    tasks,
    currentTimer,
    timerCounter,
    createTask,
    deleteTask,
    startTimer,
    stopTimer,
    loadTasks,
    deleteLog,
    editLog,
    editTaskName,
    editStatus,
    clearStoreData,
  }
})
