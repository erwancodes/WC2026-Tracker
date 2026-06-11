import { MapPin } from '@phosphor-icons/react'
import type { Match } from '../lib/api'
import { getPhase } from '../lib/matchStatus'
import { formatRound, useT } from '../lib/i18n'
import { useCountry } from '../lib/countries'
import { Pitch } from './Pitch'
import { StatusBadge } from './StatusBadge'

function TeamSide({
  flagSrc,
  label,
  align,
}: {
  flagSrc: string
  label: string
  align: 'left' | 'right'
}) {
  return (
    <div
      className={`flex flex-col gap-2 ${align === 'left' ? 'items-start' : 'items-end'}`}
    >
      <img
        src={flagSrc}
        alt={label}
        loading="lazy"
        className="h-9 w-12 rounded-sm object-cover shadow-[0_4px_12px_rgba(0,0,0,0.45)] ring-1 ring-white/20"
      />
      <span
        className={`max-w-[12ch] text-sm font-semibold leading-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] ${align === 'right' ? 'text-right' : ''}`}
      >
        {label}
      </span>
    </div>
  )
}

/** Carte match : terrain SVG, équipes de part et d'autre, score central, stade. */
export function MatchCard({ match }: { match: Match }) {
  const t = useT()
  const country = useCountry()
  const phase = getPhase(match.fixture.status.short)
  const { goals, score } = match
  const hasScore = phase !== 'upcoming' && goals.home !== null && goals.away !== null
  const hasPens = score.penalty.home !== null && score.penalty.away !== null

  return (
    <article className="overflow-hidden rounded-xl border border-edge bg-surface transition-transform duration-300 ease-out hover:-translate-y-0.5">
      <header className="flex items-center justify-between gap-2 px-4 py-3">
        <StatusBadge match={match} />
        <span className="truncate font-mono text-[11px] uppercase tracking-wider text-text-2">
          {formatRound(match.league.round, t)}
        </span>
      </header>

      <div className="relative mx-3 overflow-hidden rounded-lg">
        <Pitch className="block h-36 w-full" />
        <div className="absolute inset-0 grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4">
          <TeamSide
            flagSrc={country.flag(match.teams.home.name, match.teams.home.logo, 80)}
            label={country.label(match.teams.home.name)}
            align="left"
          />
          <div className="flex flex-col items-center gap-0.5">
            {hasScore ? (
              <>
                <span className="font-mono text-3xl font-bold tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  {goals.home}
                  <span className="mx-1.5 text-white/50">—</span>
                  {goals.away}
                </span>
                {hasPens && (
                  <span className="font-mono text-[11px] font-semibold text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    ({score.penalty.home} — {score.penalty.away})
                  </span>
                )}
              </>
            ) : (
              <span className="font-mono text-xl font-semibold text-white/70 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                vs
              </span>
            )}
          </div>
          <TeamSide
            flagSrc={country.flag(match.teams.away.name, match.teams.away.logo, 80)}
            label={country.label(match.teams.away.name)}
            align="right"
          />
        </div>
      </div>

      <footer className="flex items-center gap-1.5 px-4 py-3 text-xs text-text-2">
        <MapPin size={14} weight="regular" className="shrink-0" />
        <span className="truncate">
          {match.fixture.venue.name ?? '—'}
          {match.fixture.venue.city ? ` · ${match.fixture.venue.city}` : ''}
        </span>
      </footer>
    </article>
  )
}
