import type { Settings } from '../hooks/useSettings'

function locale(settings: Settings): string {
  return settings.language === 'fr' ? 'fr-FR' : 'en-US'
}

export function formatTime(iso: string, settings: Settings): string {
  return new Intl.DateTimeFormat(locale(settings), {
    timeZone: settings.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: settings.timeFormat === '12h',
  }).format(new Date(iso))
}

export function formatDay(iso: string, settings: Settings): string {
  return new Intl.DateTimeFormat(locale(settings), {
    timeZone: settings.timezone,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date(iso))
}

export function formatDayLong(iso: string, settings: Settings): string {
  return new Intl.DateTimeFormat(locale(settings), {
    timeZone: settings.timezone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(iso))
}

export function formatDateTime(iso: string, settings: Settings): string {
  return `${formatDay(iso, settings)} · ${formatTime(iso, settings)}`
}

/** Date du jour (YYYY-MM-DD) dans le fuseau choisi par l'utilisateur. */
export function todayInTimezone(timezone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}
