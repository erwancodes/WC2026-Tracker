import { useQuery } from '@tanstack/react-query'
import {
  fetchEventsByRound,
  GROUP_ROUNDS,
  KNOCKOUT_ROUNDS,
  type Match,
} from '../lib/api'
import { hasLiveMatch } from '../lib/matchStatus'

/** Tous les matchs du tournoi : journées de poules + phase finale (best-effort). */
export function useAllMatches(options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: ['matches', 'all'],
    queryFn: async (): Promise<Match[]> => {
      const rounds = [...GROUP_ROUNDS, ...KNOCKOUT_ROUNDS]
      const settled = await Promise.allSettled(rounds.map(fetchEventsByRound))
      const seen = new Set<number>()
      const matches: Match[] = []
      for (const result of settled) {
        if (result.status !== 'fulfilled') continue
        for (const match of result.value) {
          if (seen.has(match.fixture.id)) continue
          seen.add(match.fixture.id)
          matches.push(match)
        }
      }
      return matches
    },
    staleTime: 60_000,
    refetchInterval: (query) => (hasLiveMatch(query.state.data) ? 30_000 : false),
    enabled: options.enabled ?? true,
  })
}
