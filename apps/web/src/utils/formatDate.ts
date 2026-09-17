export function formatDate(value: string | null | undefined): string {
  if (!value) return '-'
  return new Date(value).toLocaleString()
}

export function toInputDateTimeLocal(value: string | null | undefined): string {
  if (!value) return ''
  const date = new Date(value)
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60_000)
  return local.toISOString().slice(0, 16)
}

export function fromInputDateTimeLocal(value: string): string | null {
  if (!value) return null
  return new Date(value).toISOString()
}
