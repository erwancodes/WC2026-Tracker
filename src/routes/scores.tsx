import { useMemo, useState } from 'react'
import { useSearch } from '@tanstack/react-router'
import { ArrowClockwise, MagnifyingGlass } from '@phosphor-icons/react'
import { useAllMatches } from '../hooks/useAllMatches'
import { useSettings } from '../hooks/useSettings'
import { formatRound, useT } from '../lib/i18n'
import { frenchName, useCountry } from '../lib/countries'
import { getPhase, type MatchPhase } from '../lib/matchStatus'
import { formatDay, formatTime } from '../lib/formatDate'
import { StatusBadge } from '../components/StatusBadge'
import { SkeletonRow } from '../components/SkeletonCard'
import { PageHeader } from './live'
import type { Match } from '../lib/api'

const GROUP_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
type StatusFilter = 'all' | MatchPhase

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 font-mono text-xs font-medium transition-colors active:scale-[0.97] ${
        active
          ? 'border-live bg-live/15 text-live'
          : 'border-edge bg-surface text-text-2 hover:border-edge-strong hover:text-text'
      }`}
    >
      {children}
    </button>
  )
}

function ScoreRow({ match }: { match: Match }) {
  const { settings } = useSettings()
  const country = useCountry()
  const phase = getPhase(match.fixture.status.short)
  const played = phase !== 'upcoming' && match.goals.home !== null

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 transition-colors hover:bg-surface-2/50 sm:grid-cols-[auto_1fr_auto_1fr_auto]">
      <span className="hidden w-24 shrink-0 font-mono text-[11px] text-text-2 sm:block">
        {formatDay(match.fixture.date, settings)}
      </span>

      <div className="flex min-w-0 items-center justify-end gap-2">
        <span className="truncate text-sm font-medium">
          {country.label(match.teams.home.name)}
        </span>
        <img
          src={country.flag(match.teams.home.name, match.teams.home.logo)}
          alt=""
          loading="lazy"
          className="h-5 w-7 shrink-0 rounded-[2px] object-cover ring-1 ring-edge"
        />
      </div>

      <div className="w-16 text-center">
        {played ? (
          <span className={`font-mono text-sm font-bold ${phase === 'live' ? 'text-live' : ''}`}>
            {match.goals.home} — {match.goals.away}
          </span>
        ) : (
          <span className="font-mono text-xs text-upcoming">
            {formatTime(match.fixture.date, settings)}
          </span>
        )}
      </div>

      <div className="flex min-w-0 items-center gap-2">
        <img
          src={country.flag(match.teams.away.name, match.teams.away.logo)}
          alt=""
          loading="lazy"
          className="h-5 w-7 shrink-0 rounded-[2px] object-cover ring-1 ring-edge"
        />
        <span className="truncate text-sm font-medium">
          {country.label(match.teams.away.name)}
        </span>
      </div>

      <span className="col-span-3 truncate text-center text-[11px] text-text-2 sm:col-span-1 sm:max-w-44 sm:text-right">
        {match.fixture.venue.name ?? ''}
        {match.fixture.venue.city ? ` · ${match.fixture.venue.city}` : ''}
      </span>
    </div>
  )
}

export function ScoresPage() {
  const t = useT()
  const search = useSearch({ strict: false }) as { team?: string }
  const all = useAllMatches()

  const [group, setGroup] = useState<string>('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [teamQuery, setTeamQuery] = useState(search.team ?? '')

  const filtered = useMemo(() => {
    const matches = [...(all.data ?? [])].sort(
      (a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime(),
    )
    const query = teamQuery.trim().toLowerCase()
    return matches.filter((m) => {
      if (group !== 'all' && m.group !== group) return false
      if (status !== 'all' && getPhase(m.fixture.status.short) !== status) return false
      if (query) {
        const haystack = [
          m.teams.home.name,
          m.teams.away.name,
          frenchName(m.teams.home.name),
          frenchName(m.teams.away.name),
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })
  }, [all.data, group, status, teamQuery])

  const live = filtered.filter((m) => getPhase(m.fixture.status.short) === 'live')
  const rest = filtered.filter((m) => getPhase(m.fixture.status.short) !== 'live')

  // Groupement par phase (round), dans l'ordre chronologique
  const byRound = useMemo(() => {
    const rounds: { round: string; matches: Match[] }[] = []
    for (const match of rest) {
      const last = rounds[rounds.length - 1]
      if (last && last.round === match.league.round) last.matches.push(match)
      else rounds.push({ round: match.league.round, matches: [match] })
    }
    return rounds
  }, [rest])

  return (
    <div>
      <PageHeader title={t('scores.title')} subtitle={t('scores.subtitle')} />

      {/* Filtres */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-text-2">
            {t('scores.filter.group')}
          </span>
          <FilterChip active={group === 'all'} onClick={() => setGroup('all')}>
            {t('scores.filter.all.groups')}
          </FilterChip>
          {GROUP_LETTERS.map((letter) => (
            <FilterChip key={letter} active={group === letter} onClick={() => setGroup(letter)}>
              {letter}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-text-2">
            {t('scores.filter.status')}
          </span>
          {(
            [
              ['all', t('scores.filter.status.all')],
              ['live', t('scores.filter.status.live')],
              ['finished', t('scores.filter.status.finished')],
              ['upcoming', t('scores.filter.status.upcoming')],
            ] as [StatusFilter, string][]
          ).map(([value, label]) => (
            <FilterChip key={value} active={status === value} onClick={() => setStatus(value)}>
              {label}
            </FilterChip>
          ))}
        </div>
        <label className="relative block max-w-sm">
          <MagnifyingGlass
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-2"
          />
          <input
            type="text"
            value={teamQuery}
            onChange={(e) => setTeamQuery(e.target.value)}
            placeholder={t('scores.filter.team')}
            className="w-full rounded-lg border border-edge bg-surface py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-text-2 focus:border-live/60"
          />
        </label>
      </div>

      {/* États */}
      {all.isLoading && (
        <div className="overflow-hidden rounded-xl border border-edge bg-surface">
          {Array.from({ length: 10 }, (_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      )}

      {all.isError && (
        <div className="flex flex-col items-start gap-4 rounded-xl border border-edge bg-surface p-6">
          <p className="text-sm text-text-2">
            {t('live.error')}
            <span className="mt-1 block font-mono text-xs opacity-70">
              {(all.error as Error).message}
            </span>
          </p>
          <button
            type="button"
            onClick={() => all.refetch()}
            className="flex items-center gap-2 rounded-lg bg-live px-4 py-2 text-sm font-bold text-[#0a0a0a] transition-transform hover:brightness-110 active:scale-[0.98]"
          >
            <ArrowClockwise size={16} weight="bold" />
            {t('live.retry')}
          </button>
        </div>
      )}

      {all.isSuccess && filtered.length === 0 && (
        <p className="rounded-xl border border-edge bg-surface px-5 py-8 text-center text-sm text-text-2">
          {t('scores.empty')}
        </p>
      )}

      {/* Matchs en cours épinglés */}
      {live.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-live">
            <span className="size-1.5 rounded-full bg-live animate-pulse-live" />
            {t('scores.live.now')}
          </h2>
          <div className="divide-y divide-edge overflow-hidden rounded-xl border border-live/40 bg-surface">
            {live.map((match) => (
              <div key={match.fixture.id} className="relative">
                <div className="flex items-center justify-center pt-2">
                  <StatusBadge match={match} />
                </div>
                <ScoreRow match={match} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Par phase / journée */}
      <div className="space-y-8">
        {byRound.map(({ round, matches }) => (
          <section key={round}>
            <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-text-2">
              {formatRound(round, t)}
            </h2>
            <div className="divide-y divide-edge overflow-hidden rounded-xl border border-edge bg-surface">
              {matches.map((match) => (
                <ScoreRow key={match.fixture.id} match={match} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
