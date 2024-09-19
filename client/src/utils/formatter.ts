import { DateTime } from 'luxon'

export const tailingSlash = (url: string) => url.replace(/\/$/, '')
export const formatEpoch = (seconds: number, format: string) => DateTime.fromSeconds(seconds).toFormat(format)
