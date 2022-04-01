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
