import { useEffect, useState } from 'react'

export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

/** Décompte jusqu'à une date ISO, rafraîchi chaque seconde. À isoler dans un composant feuille. */
export function useCountdownParts(iso: string): CountdownParts {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, new Date(iso).getTime() - now)
  const total = Math.floor(diff / 1000)
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
    isPast: diff <= 0,
  }
}
