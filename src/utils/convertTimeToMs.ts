import { Time } from '@/types'

export function convertTimeToMs(time: Time): number {
  return time.hours * 3600000 + time.minutes * 60000 + time.seconds * 1000
}
