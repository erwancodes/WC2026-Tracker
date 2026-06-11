// ── Source de données : TheSportsDB ───────────────────────────────────────────
// API gratuite, sans backend (CORS *), couvrant la Coupe du Monde 2026 EN COURS.
// League 4429 = FIFA World Cup, season "2026". Clé de test "123" par défaut ;
// chacun peut obtenir une clé gratuite (limites plus hautes) sur thesportsdb.com.

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://www.thesportsdb.com/api/v1/json'
const API_KEY = import.meta.env.VITE_THESPORTSDB_KEY || '123'

export const LEAGUE_ID = 4429
export const SEASON = import.meta.env.VITE_SEASON || '2026'

// Journées de poules : 12 groupes × 2 matchs = 24 par journée (rounds 1-3).
export const GROUP_ROUNDS = [1, 2, 3]
// Rounds utilisés par TheSportsDB pour la phase à élimination directe (best-effort :
// remplis au fur et à mesure que les qualifiés sont connus).
export const KNOCKOUT_ROUNDS = [160, 150, 140, 125, 128, 127, 126]

export type MatchStatusShort =
  | 'NS' | '1H' | 'HT' | '2H' | 'ET' | 'BT' | 'P'
  | 'FT' | 'AET' | 'PEN' | 'PST' | 'CANC' | 'ABD'

// ── Types bruts TheSportsDB ─────────────────────────────────────────────────
type TsdbEvent = {
  idEvent: string
  strTimestamp: string | null
  dateEvent: string | null
  strTime: string | null
  strHomeTeam: string
  strAwayTeam: string
  idHomeTeam: string | null
  idAwayTeam: string | null
  strHomeTeamBadge: string | null
  strAwayTeamBadge: string | null
  intHomeScore: string | null
  intAwayScore: string | null
  intRound: string | null
  strGroup: string | null
  strVenue: string | null
  strCity: string | null
  strStatus: string | null
  strProgress: string | null
}

type TsdbPlayer = {
  idPlayer: string
  strPlayer: string
  strNumber: string | null
  strPosition: string | null
  strTeam: string | null
  dateBorn: string | null
  strCutout: string | null
  strThumb: string | null
}

// ── Types internes (stables, consommés par les composants) ──────────────────
export type Match = {
  fixture: {
    id: number
    date: string
    status: { short: MatchStatusShort; elapsed: number | null }
    venue: { name: string | null; city: string | null }
  }
  teams: {
    home: { id: number; name: string; logo: string }
    away: { id: number; name: string; logo: string }
  }
  goals: { home: number | null; away: number | null }
  score: { penalty: { home: number | null; away: number | null } }
  group: string | null
  league: { round: string }
}

export type StandingRow = {
  rank: number
  team: { id: number; name: string; logo: string }
  points: number
  goalsDiff: number
  group: string
  all: {
    played: number
    win: number
    draw: number
    lose: number
    goals: { for: number; against: number }
  }
}

export type SquadPlayer = {
  id: number
  name: string
  age: number | null
  number: number | null
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker'
  club: string | null
  photo: string
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function tsdbGet<T>(path: string, key: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/${API_KEY}/${path}`)
  if (!res.ok) throw new ApiError(`Erreur API (HTTP ${res.status})`)
  const json = await res.json()
  return (json[key] ?? null) as T
}

// ── Normalisation ───────────────────────────────────────────────────────────
function mapStatus(raw: string | null): MatchStatusShort {
  const s = (raw ?? '').toUpperCase().trim()
  if (['1H', 'FIRST HALF'].includes(s)) return '1H'
  if (['HT', 'HALF TIME', 'HALFTIME'].includes(s)) return 'HT'
  if (['2H', 'SECOND HALF'].includes(s)) return '2H'
  if (['ET', 'EXTRA TIME'].includes(s)) return 'ET'
  if (['BT', 'BREAK TIME'].includes(s)) return 'BT'
  if (['P', 'PEN LIVE', 'PENALTIES'].includes(s)) return 'P'
  if (['FT', 'MATCH FINISHED', 'FULL TIME', 'FINISHED'].includes(s)) return 'FT'
  if (['AET', 'AFTER EXTRA TIME'].includes(s)) return 'AET'
  if (['PEN', 'AFTER PENALTIES'].includes(s)) return 'PEN'
  if (['PST', 'POSTPONED'].includes(s)) return 'PST'
  if (['CANC', 'CANCELLED', 'CANCELED'].includes(s)) return 'CANC'
  if (['ABD', 'ABANDONED'].includes(s)) return 'ABD'
  // "NS", "Not Started", "", null, dates futures…
  return 'NS'
}

function isoDate(e: TsdbEvent): string {
  const ts = e.strTimestamp
  if (ts) return ts.endsWith('Z') || ts.includes('+') ? ts : `${ts}Z`
  if (e.dateEvent) return `${e.dateEvent}T${e.strTime || '00:00:00'}Z`
  return new Date().toISOString()
}

function cleanCity(city: string | null): string | null {
  if (!city) return null
  // "Mexico City, MX" → "Mexico City"
  return city.replace(/,\s*[A-Z]{2}$/, '').trim()
}

function roundLabel(e: TsdbEvent): string {
  if (e.strGroup) return `Group Stage - ${e.intRound ?? 1}`
  return 'Knockout'
}

function toScore(value: string | null): number | null {
  if (value === null || value === '') return null
  const n = Number(value)
  return Number.isNaN(n) ? null : n
}

export function normalizeMatch(e: TsdbEvent): Match {
  const progress = e.strProgress ? parseInt(e.strProgress, 10) : NaN
  return {
    fixture: {
      id: Number(e.idEvent),
      date: isoDate(e),
      status: {
        short: mapStatus(e.strStatus),
        elapsed: Number.isNaN(progress) ? null : progress,
      },
      venue: { name: e.strVenue ?? null, city: cleanCity(e.strCity) },
    },
    teams: {
      home: {
        id: Number(e.idHomeTeam ?? 0),
        name: e.strHomeTeam,
        logo: e.strHomeTeamBadge ?? '',
      },
      away: {
        id: Number(e.idAwayTeam ?? 0),
        name: e.strAwayTeam,
        logo: e.strAwayTeamBadge ?? '',
      },
    },
    goals: { home: toScore(e.intHomeScore), away: toScore(e.intAwayScore) },
    score: { penalty: { home: null, away: null } },
    group: e.strGroup ? e.strGroup.replace(/^Group\s+/i, '').trim() : null,
    league: { round: roundLabel(e) },
  }
}

const POSITION_BUCKETS: { match: RegExp; bucket: SquadPlayer['position'] }[] = [
  { match: /keeper|goalie|gk/i, bucket: 'Goalkeeper' },
  { match: /back|defen|cb|rb|lb|wing-?back/i, bucket: 'Defender' },
  { match: /midfield|cm|dm|am|mid/i, bucket: 'Midfielder' },
  { match: /forward|striker|wing|attack|centre-?forward|cf| st/i, bucket: 'Attacker' },
]

function bucketPosition(raw: string | null): SquadPlayer['position'] {
  for (const { match, bucket } of POSITION_BUCKETS) {
    if (match.test(raw ?? '')) return bucket
  }
  return 'Midfielder'
}

function ageFrom(dateBorn: string | null): number | null {
  if (!dateBorn) return null
  const born = new Date(dateBorn)
  if (Number.isNaN(born.getTime())) return null
  const diff = Date.now() - born.getTime()
  return Math.floor(diff / (365.25 * 24 * 3600 * 1000))
}

export function normalizePlayer(p: TsdbPlayer): SquadPlayer {
  return {
    id: Number(p.idPlayer),
    name: p.strPlayer,
    age: ageFrom(p.dateBorn),
    number: p.strNumber ? Number(p.strNumber) : null,
    position: bucketPosition(p.strPosition),
    club: p.strTeam || null,
    photo: p.strCutout || p.strThumb || '',
  }
}

// ── Appels ───────────────────────────────────────────────────────────────────
export async function fetchEventsByRound(round: number): Promise<Match[]> {
  const events = await tsdbGet<TsdbEvent[] | null>(
    `eventsround.php?id=${LEAGUE_ID}&r=${round}&s=${SEASON}`,
    'events',
  )
  return (events ?? []).map(normalizeMatch)
}

export async function fetchEventsByDay(day: string): Promise<Match[]> {
  const events = await tsdbGet<TsdbEvent[] | null>(
    `eventsday.php?d=${day}&l=${LEAGUE_ID}`,
    'events',
  )
  return (events ?? []).map(normalizeMatch)
}

export async function fetchSquad(teamId: number): Promise<SquadPlayer[]> {
  const players = await tsdbGet<TsdbPlayer[] | null>(
    `lookup_all_players.php?id=${teamId}`,
    'player',
  )
  return (players ?? []).map(normalizePlayer)
}
