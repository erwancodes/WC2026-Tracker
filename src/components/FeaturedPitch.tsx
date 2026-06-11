import { memo } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from '@phosphor-icons/react'
import type { Match } from '../lib/api'
import { getPhase } from '../lib/matchStatus'
import { formatDay, formatTime } from '../lib/formatDate'
import { formatRound, useT, type TranslationKey } from '../lib/i18n'
import { useCountry } from '../lib/countries'
import { useCountdown } from '../hooks/useCountdown'
import { useCountdownParts } from '../hooks/useCountdownParts'
import { useSettings } from '../hooks/useSettings'
import { Pitch } from './Pitch'

/* Compte à rebours d'ouverture — composant feuille mémoïsé : il égrène les secondes
   sans re-rendre tout le terrain. */
const OpeningCountdown = memo(function OpeningCountdown({ iso }: { iso: string }) {
  const t = useT()
  const { days, hours, minutes, seconds } = useCountdownParts(iso)
  const segments: { value: number; label: TranslationKey }[] = [
    { value: days, label: 'countdown.days' },
    { value: hours, label: 'countdown.hours' },
    { value: minutes, label: 'countdown.minutes' },
    { value: seconds, label: 'countdown.seconds' },
  ]

  return (
    <div className="flex flex-col items-center">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-black/35 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm md:text-xs">
        <span className="size-1.5 rounded-full bg-[#00d084] animate-pulse-live" />
        {t('countdown.kickoff')}
      </span>
      <div className="flex items-start gap-2 md:gap-4">
        {segments.map((seg, i) => (
          <div key={seg.label} className="flex items-start gap-2 md:gap-4">
            {i > 0 && (
              <span className="pt-1 font-mono text-3xl font-bold text-white/35 md:text-6xl">:</span>
            )}
            <div className="flex flex-col items-center">
              <span className="font-mono text-4xl font-extrabold tabular-nums leading-none text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] md:text-7xl">
                {String(seg.value).padStart(2, '0')}
              </span>
              <span className="mt-2 font-mono text-[10px] uppercase tracking-wider text-white/70 md:text-xs">
                {t(seg.label)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

function TeamColumn({
  name,
  logo,
  align,
}: {
  name: string
  logo: string
  align: 'left' | 'right'
}) {
  const country = useCountry()
  return (
    <div
      className={`flex min-w-0 flex-col items-center gap-3 text-center ${
        align === 'left' ? 'md:items-end md:text-right' : 'md:items-start md:text-left'
      }`}
    >
      <img
        src={country.flag(name, logo, 160)}
        alt={country.label(name)}
        className="h-14 w-20 rounded-md object-cover shadow-[0_10px_30px_rgba(0,0,0,0.55)] ring-1 ring-white/30 md:h-24 md:w-36"
      />
      <span className="max-w-[8ch] text-lg font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] sm:max-w-[14ch] md:text-3xl">
        {country.label(name)}
      </span>
    </div>
  )
}

/** Terrain immersif plein écran pour le match vedette (en cours ou à venir). */
export function FeaturedPitch({
  match,
  opening = false,
}: {
  match: Match
  opening?: boolean
}) {
  const t = useT()
  const country = useCountry()
  const { settings } = useSettings()
  const phase = getPhase(match.fixture.status.short)
  const live = phase === 'live'
  const finished = phase === 'finished'
  const played = !!(phase !== 'upcoming' && match.goals.home !== null)
  const countdown = useCountdown(match.fixture.date)
  const { short, elapsed } = match.fixture.status

  const statusLabel = live
    ? short === 'HT'
      ? t('status.halftime')
      : short === 'P'
        ? t('status.penalties')
        : `${t('status.live')}${elapsed !== null ? ` · ${elapsed}’` : ''}`
    : finished
      ? t('status.finished')
      : `${formatDay(match.fixture.date, settings)} · ${formatTime(match.fixture.date, settings)}`

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 90, damping: 18 }}
      className="relative min-h-[72vh] overflow-hidden rounded-2xl border border-edge bg-pitch md:min-h-[80dvh]"
    >
      <Pitch className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/70"
      />

      <div className="absolute inset-0 flex flex-col p-5 md:p-10">
        {/* Haut : statut + phase */}
        <div className="flex items-start justify-between gap-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wide backdrop-blur-sm md:text-sm ${
              live
                ? 'bg-live/20 text-live'
                : finished
                  ? 'bg-black/40 text-white/80'
                  : 'bg-upcoming/20 text-white'
            }`}
          >
            {live && <span className="size-2 rounded-full bg-live animate-pulse-live" />}
            <span className={live ? 'animate-pulse-live' : ''}>{statusLabel}</span>
          </span>
          <span className="rounded-full bg-black/40 px-3 py-1.5 text-right font-mono text-[11px] uppercase tracking-wider text-white/70 backdrop-blur-sm md:text-xs">
            {formatRound(match.league.round, t)}
            {match.group ? ` · ${t('standings.group')} ${match.group}` : ''}
          </span>
        </div>

        {/* Centre : compte à rebours d'ouverture, ou équipes + score */}
        {opening ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <OpeningCountdown iso={match.fixture.date} />
            {/* Affiche du match d'ouverture */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                {t('countdown.opener')}
              </span>
              <div className="flex items-center gap-3 md:gap-4">
                <span className="flex items-center gap-2">
                  <img
                    src={country.flag(match.teams.home.name, match.teams.home.logo, 80)}
                    alt={country.label(match.teams.home.name)}
                    className="h-7 w-10 rounded-sm object-cover shadow-[0_4px_12px_rgba(0,0,0,0.5)] ring-1 ring-white/30"
                  />
                  <span className="text-base font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] md:text-lg">
                    {country.label(match.teams.home.name)}
                  </span>
                </span>
                <span className="font-mono text-sm font-bold text-white/55">VS</span>
                <span className="flex items-center gap-2">
                  <span className="text-base font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] md:text-lg">
                    {country.label(match.teams.away.name)}
                  </span>
                  <img
                    src={country.flag(match.teams.away.name, match.teams.away.logo, 80)}
                    alt={country.label(match.teams.away.name)}
                    className="h-7 w-10 rounded-sm object-cover shadow-[0_4px_12px_rgba(0,0,0,0.5)] ring-1 ring-white/30"
                  />
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="grid w-full max-w-4xl grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-8">
              <TeamColumn name={match.teams.home.name} logo={match.teams.home.logo} align="left" />

              <div className="flex flex-col items-center gap-1">
                {played ? (
                  <span className="font-mono text-6xl font-extrabold leading-none tracking-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] md:text-8xl">
                    {match.goals.home}
                    <span className="mx-2 text-white/45 md:mx-4">–</span>
                    {match.goals.away}
                  </span>
                ) : (
                  <>
                    <span className="font-mono text-4xl font-bold text-white/55 drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] md:text-6xl">
                      VS
                    </span>
                    <span className="mt-1 font-mono text-base font-semibold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] md:text-xl">
                      {formatTime(match.fixture.date, settings)}
                    </span>
                    <span className="font-mono text-xs text-white/70">{countdown}</span>
                  </>
                )}
              </div>

              <TeamColumn name={match.teams.away.name} logo={match.teams.away.logo} align="right" />
            </div>
          </div>
        )}

        {/* Bas : lieu */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-white/75 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] md:text-sm">
          <MapPin size={15} weight="fill" className="shrink-0" />
          <span className="truncate">
            {match.fixture.venue.name ?? '—'}
            {match.fixture.venue.city ? ` · ${match.fixture.venue.city}` : ''}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/** Squelette plein écran pendant le chargement du match vedette. */
export function FeaturedPitchSkeleton() {
  return <div className="min-h-[72vh] rounded-2xl border border-edge skeleton md:min-h-[80dvh]" />
}
