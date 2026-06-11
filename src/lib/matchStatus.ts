import type { Match, MatchStatusShort } from './api'

export type MatchPhase = 'live' | 'finished' | 'upcoming'

const LIVE_STATUSES: MatchStatusShort[] = ['1H', 'HT', '2H', 'ET', 'BT', 'P']
const FINISHED_STATUSES: MatchStatusShort[] = ['FT', 'AET', 'PEN']

export function getPhase(short: MatchStatusShort): MatchPhase {
  if (LIVE_STATUSES.includes(short)) return 'live'
  if (FINISHED_STATUSES.includes(short)) return 'finished'
  return 'upcoming'
}

export function isLive(match: Match): boolean {
  return getPhase(match.fixture.status.short) === 'live'
}

export function hasLiveMatch(matches: Match[] | undefined): boolean {
  return Boolean(matches?.some(isLive))
}

const PHASE_ORDER: Record<MatchPhase, number> = { live: 0, upcoming: 1, finished: 2 }

/** EN COURS en premier, puis À VENIR par heure croissante, puis TERMINÉS. */
export function sortMatches(matches: Match[]): Match[] {
  return [...matches].sort((a, b) => {
    const phaseDiff =
      PHASE_ORDER[getPhase(a.fixture.status.short)] -
      PHASE_ORDER[getPhase(b.fixture.status.short)]
    if (phaseDiff !== 0) return phaseDiff
    return new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
  })
}
