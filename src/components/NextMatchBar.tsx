import { Link } from '@tanstack/react-router'
import { CaretRight } from '@phosphor-icons/react'
import { useAllMatches } from '../hooks/useAllMatches'
import { getPhase, isLive, sortMatches } from '../lib/matchStatus'
import { useSettings } from '../hooks/useSettings'
import { useT } from '../lib/i18n'
import { useCountry } from '../lib/countries'
import { useCountdown } from '../hooks/useCountdown'
import { formatTime } from '../lib/formatDate'
import type { Match } from '../lib/api'

function Flag({ name, logo }: { name: string; logo: string }) {
  const country = useCountry()
  return (
    <img
      src={country.flag(name, logo, 80)}
      alt={country.label(name)}
      loading="lazy"
      className="h-5 w-7 shrink-0 rounded-[2px] object-cover ring-1 ring-edge"
    />
  )
}

function BarContent({ match, liveExtra }: { match: Match; liveExtra: number }) {
  const t = useT()
  const country = useCountry()
  const { settings } = useSettings()
  const phase = getPhase(match.fixture.status.short)
  const live = phase === 'live'
  const played = phase !== 'upcoming' && match.goals.home !== null
  const countdown = useCountdown(match.fixture.date)
  const { home, away } = match.teams

  return (
    <Link
      to="/app"
      className="group flex items-center gap-3 rounded-xl border border-edge bg-surface px-4 py-2.5 transition-colors hover:border-edge-strong sm:gap-4"
    >
      {/* Libellé */}
      <span className="flex shrink-0 items-center gap-1.5">
        {live && <span className="size-1.5 rounded-full bg-live animate-pulse-live" />}
        <span
          className={`font-mono text-[10px] font-semibold uppercase tracking-wider ${
            live ? 'text-live animate-pulse-live' : 'text-upcoming'
          }`}
        >
          {live ? t('bar.live') : t('bar.next')}
        </span>
      </span>

      <span className="hidden h-4 w-px bg-edge sm:block" />

      {/* Match */}
      <span className="flex min-w-0 flex-1 items-center justify-center gap-2.5 sm:justify-start">
        <span className="flex items-center gap-2">
          <span className="hidden truncate text-sm font-semibold sm:inline">
            {country.label(home.name)}
          </span>
          <Flag name={home.name} logo={home.logo} />
        </span>

        <span className="shrink-0 px-1 text-center font-mono text-sm font-bold tabular-nums">
          {played ? (
            <span className={live ? 'text-live' : ''}>
              {match.goals.home}
              <span className="mx-1 text-text-2">:</span>
              {match.goals.away}
              {live && match.fixture.status.elapsed !== null && (
                <span className="ml-1.5 text-[11px] text-live">
                  {match.fixture.status.elapsed}’
                </span>
              )}
            </span>
          ) : (
            <span className="text-upcoming">{formatTime(match.fixture.date, settings)}</span>
          )}
        </span>

        <span className="flex items-center gap-2">
          <Flag name={away.name} logo={away.logo} />
          <span className="hidden truncate text-sm font-semibold sm:inline">
            {country.label(away.name)}
          </span>
        </span>
      </span>

      {/* Méta à droite */}
      <span className="ml-auto hidden shrink-0 items-center gap-3 md:flex">
        {liveExtra > 0 ? (
          <span className="font-mono text-[11px] text-text-2">
            +{liveExtra} {liveExtra === 1 ? t('bar.others.one') : t('bar.others.many')}
          </span>
        ) : !live ? (
          <span className="font-mono text-[11px] text-text-2">{countdown}</span>
        ) : (
          <span className="max-w-40 truncate font-mono text-[11px] text-text-2">
            {match.fixture.venue.city ?? match.fixture.venue.name}
          </span>
        )}
        <CaretRight
          size={14}
          weight="bold"
          className="text-text-2 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  )
}

/** Barre persistante affichant le match en cours, sinon le prochain match. */
export function NextMatchBar() {
  const all = useAllMatches()
  if (!all.data || all.data.length === 0) return null

  const liveMatches = all.data.filter(isLive)
  const target =
    liveMatches.length > 0
      ? sortMatches(liveMatches)[0]
      : sortMatches(all.data).find((m) => getPhase(m.fixture.status.short) === 'upcoming')

  if (!target) return null

  return (
    <div className="mb-6">
      <BarContent match={target} liveExtra={Math.max(0, liveMatches.length - 1)} />
    </div>
  )
}
