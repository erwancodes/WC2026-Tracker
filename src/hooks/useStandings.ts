import { useMemo } from 'react'
import type { Match, StandingRow } from '../lib/api'
import { getPhase } from '../lib/matchStatus'
import { useAllMatches } from './useAllMatches'

export type Group = {
  name: string
  letter: string
  rows: StandingRow[]
}

type Accumulator = {
  team: StandingRow['team']
  played: number
  win: number
  draw: number
  lose: number
  gf: number
  ga: number
  points: number
}

function ensure(map: Map<number, Accumulator>, team: StandingRow['team']) {
  let acc = map.get(team.id)
  if (!acc) {
    acc = { team, played: 0, win: 0, draw: 0, lose: 0, gf: 0, ga: 0, points: 0 }
    map.set(team.id, acc)
  } else if (!acc.team.logo && team.logo) {
    acc.team = team
  }
  return acc
}

/** Classements des groupes (A → L), calculés à partir des résultats joués. */
export function computeGroups(matches: Match[]): Group[] {
  const byGroup = new Map<string, Map<number, Accumulator>>()

  for (const match of matches) {
    if (!match.group) continue
    if (!byGroup.has(match.group)) byGroup.set(match.group, new Map())
    const table = byGroup.get(match.group)!
    const home = ensure(table, match.teams.home)
    const away = ensure(table, match.teams.away)

    const finished = getPhase(match.fixture.status.short) === 'finished'
    const { home: hg, away: ag } = match.goals
    if (!finished || hg === null || ag === null) continue

    home.played++
    away.played++
    home.gf += hg
    home.ga += ag
    away.gf += ag
    away.ga += hg
    if (hg > ag) {
      home.win++, away.lose++, (home.points += 3)
    } else if (hg < ag) {
      away.win++, home.lose++, (away.points += 3)
    } else {
      home.draw++, away.draw++, home.points++, away.points++
    }
  }

  return [...byGroup.entries()]
    .map(([letter, table]) => {
      const rows = [...table.values()]
        .sort(
          (a, b) =>
            b.points - a.points ||
            b.gf - b.ga - (a.gf - a.ga) ||
            b.gf - a.gf ||
            a.team.name.localeCompare(b.team.name),
        )
        .map(
          (acc, i): StandingRow => ({
            rank: i + 1,
            team: acc.team,
            points: acc.points,
            goalsDiff: acc.gf - acc.ga,
            group: `Group ${letter}`,
            all: {
              played: acc.played,
              win: acc.win,
              draw: acc.draw,
              lose: acc.lose,
              goals: { for: acc.gf, against: acc.ga },
            },
          }),
        )
      return { name: `Group ${letter}`, letter, rows }
    })
    .sort((a, b) => a.letter.localeCompare(b.letter))
}

/** Expose les classements dérivés avec la même interface qu'une query. */
export function useStandings() {
  const matches = useAllMatches()
  const data = useMemo(
    () => (matches.data ? computeGroups(matches.data) : undefined),
    [matches.data],
  )
  return {
    data,
    isLoading: matches.isLoading,
    isError: matches.isError,
    isSuccess: matches.isSuccess,
    error: matches.error,
    refetch: matches.refetch,
    dataUpdatedAt: matches.dataUpdatedAt,
  }
}
