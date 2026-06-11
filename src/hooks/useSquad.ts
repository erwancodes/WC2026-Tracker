import { useQuery } from '@tanstack/react-query'
import { fetchSquad, type SquadPlayer } from '../lib/api'

export type Squad = {
  players: SquadPlayer[]
}

/** Effectif d'une équipe (TheSportsDB). */
export function useSquad(teamId: number | null) {
  return useQuery({
    queryKey: ['squad', teamId],
    queryFn: async (): Promise<Squad> => ({
      players: await fetchSquad(teamId!),
    }),
    enabled: teamId !== null && teamId > 0,
    staleTime: Infinity,
  })
}
