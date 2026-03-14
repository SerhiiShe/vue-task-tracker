import { Time } from '@/types'

export function formatTimeObject(ms: number): Time {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.ceil((ms % 60000) / 1000)

  return {
    hours,
    minutes,
    seconds,
  }
}
