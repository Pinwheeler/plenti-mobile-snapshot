import { format, parse } from "fecha"
import { Logger } from "./Logger"

export const fromISOTime = (isoString: string) => {
  const val = parse(isoString, "isoDateTime")
  if (!val) {
    const message = `Failed to parse string as ISO ${isoString}`
    Logger.error(message)
    throw new Error(message)
  }
  return val
}

export const toISOTime = (date: Date) => format(date, "isoDateTime")

export const optoISOTime = (date?: Date) => (date ? toISOTime(date) : undefined)

export function timeDifference(current: Date, previous: Date) {
  var msPerMinute = 60 * 1000
  var msPerHour = msPerMinute * 60
  var msPerDay = msPerHour * 24
  var msPerMonth = msPerDay * 30
  var msPerYear = msPerDay * 365

  var elapsed = current.getTime() - previous.getTime()

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago"
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago"
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago"
  } else if (elapsed < msPerMonth) {
    return "approximately " + Math.round(elapsed / msPerDay) + " days ago"
  } else if (elapsed < msPerYear) {
    return "approximately " + Math.round(elapsed / msPerMonth) + " months ago"
  } else {
    return "approximately " + Math.round(elapsed / msPerYear) + " years ago"
  }
}
