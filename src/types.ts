import type { User as FirebaseUser } from 'firebase/auth'

export type AuthUser = FirebaseUser | null

export interface TimerLog {
  timestampStart: number
  timestampStop: number
  timestampTime: number
  time: string
}

export interface Task {
  id: string
  name: string
  logs: TimerLog[]
}

export interface CurrentTimer {
  taskId: string
  startTimestamp: number
}

export interface SignupFormValues {
  email: string
  password: string
}

export interface LoginFormValues {
  email: string
  password: string
}
