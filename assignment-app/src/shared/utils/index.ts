export const formatDate = (date: Date | string): string => {
  return new Date(date).toDateString()
}

export const formatDateTimeLog = (date: Date | string): string => {
  const d = new Date(date)
  return `${d.toDateString()} ${d.toLocaleTimeString()}`
}
