export function formatTime(ms: number): string {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.ceil((ms % 60000) / 1000)

  const pad = (n: number) => String(n).padStart(2, '0')

  return `${hours}:${pad(minutes)}:${pad(seconds)}`
}
