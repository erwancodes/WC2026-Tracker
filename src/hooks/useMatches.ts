import { useQuery } from '@tanstack/react-query'
import { fetchEventsByDay, type Match } from '../lib/api'
import { hasLiveMatch } from '../lib/matchStatus'
import { todayInTimezone } from '../lib/formatDate'
import { useSettings } from './useSettings'

/** Matchs du jour (dans le fuseau choisi). Auto-refresh 30s uniquement si un match est en cours. */
export function useMatches() {
  const { settings } = useSettings()
  const today = todayInTimezone(settings.timezone)

  return useQuery({
    queryKey: ['matches', 'day', today],
    queryFn: (): Promise<Match[]> => fetchEventsByDay(today),
    staleTime: 30_000,
    refetchInterval: (query) => (hasLiveMatch(query.state.data) ? 30_000 : false),
  })
}
