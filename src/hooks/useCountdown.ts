import { useEffect, useState } from 'react'
import { useSettings } from './useSettings'
import { useT } from '../lib/i18n'

/** Compte à rebours relatif jusqu'à une date ISO, localisé. Ex : "dans 2 j", "dans 3 h 15 min". */
export function useCountdown(iso: string): string {
  const { settings } = useSettings()
  const t = useT()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(id)
  }, [])

  const diff = new Date(iso).getTime() - now
  if (diff <= 0) return t('bar.starting')

  const minutes = Math.floor(diff / 60_000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  let value: string
  if (days >= 1) value = `${days} ${settings.language === 'fr' ? 'j' : 'd'} ${hours % 24} h`
  else if (hours >= 1) value = `${hours} h ${minutes % 60} min`
  else value = `${minutes} min`

  return `${t('bar.in')} ${value}`
}
