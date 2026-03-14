import type { User as FirebaseUser } from 'firebase/auth'

export type AuthUser = FirebaseUser | null

export const TASK_STATUS = {
  active: 'active',
  pending: 'pending',
  completed: 'completed',
} as const

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS]

export interface Time {
  hours: number
  minutes: number
  seconds: number
}

export interface TimerLogPayload {
  timestampStart: number
  timestampStop: number
  timestampTime: number
  time: Time
}

export interface TimerLog extends TimerLogPayload {
  id: string
}

export interface TaskPayload {
  name: string
  status: TaskStatus
}

export interface Task extends TaskPayload {
  id: string
  logs?: TimerLog[]
}

export interface CurrentTimer {
  taskId: string
  startTimestamp: number
}

export interface CurrentTimerPayload {
  currentTimer: CurrentTimer
}

export interface SignupFormValues {
  email: string
  password: string
}

export interface LoginFormValues {
  email: string
  password: string
}
