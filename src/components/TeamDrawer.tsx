import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, X } from '@phosphor-icons/react'
import type { StandingRow, SquadPlayer } from '../lib/api'
import { useSquad } from '../hooks/useSquad'
import { useT, type TranslationKey } from '../lib/i18n'
import { useCountry } from '../lib/countries'

export type DrawerTeam = {
  row: StandingRow
  letter: string
}

const POSITION_ORDER: { key: string; label: TranslationKey }[] = [
  { key: 'Goalkeeper', label: 'pos.goalkeeper' },
  { key: 'Defender', label: 'pos.defender' },
  { key: 'Midfielder', label: 'pos.midfielder' },
  { key: 'Attacker', label: 'pos.attacker' },
]

function ordinal(rank: number, lang: 'fr' | 'en'): string {
  if (lang === 'fr') return rank === 1 ? '1er' : `${rank}e`
  const suffix = rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'
  return `${rank}${suffix}`
}

function PlayerRow({ player, yearsLabel }: { player: SquadPlayer; yearsLabel: string }) {
  return (
    <li className="flex items-center gap-3 px-5 py-2.5">
      <span className="w-7 shrink-0 text-right font-mono text-xs text-text-2">
        {player.number ?? '—'}
      </span>
      <img
        src={player.photo}
        alt=""
        loading="lazy"
        className="size-8 shrink-0 rounded-full bg-surface-2 object-cover ring-1 ring-edge"
      />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium leading-tight">{player.name}</span>
        {player.club && (
          <span className="truncate text-[11px] text-text-2">{player.club}</span>
        )}
      </span>
      {player.age !== null && (
        <span className="shrink-0 font-mono text-xs text-text-2">
          {player.age} {yearsLabel}
        </span>
      )}
    </li>
  )
}

function SquadSkeleton() {
  return (
    <div className="space-y-3 px-5 py-4">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="skeleton size-8 rounded-full" />
          <div className="skeleton h-3 w-40 rounded" />
        </div>
      ))}
    </div>
  )
}

/** Drawer latéral : bannière équipe, stats rapides, effectif, staff. Echap / clic extérieur pour fermer. */
export function TeamDrawer({
  team,
  onClose,
}: {
  team: DrawerTeam | null
  onClose: () => void
}) {
  const t = useT()
  const country = useCountry()
  const navigate = useNavigate()
  const squad = useSquad(team?.row.team.id ?? null)

  useEffect(() => {
    if (!team) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [team, onClose])

  const stats = team
    ? [
        { label: t('drawer.stats.points'), value: team.row.points },
        { label: t('drawer.stats.played'), value: team.row.all.played },
        { label: t('drawer.stats.goals.for'), value: team.row.all.goals.for },
        { label: t('drawer.stats.goals.against'), value: team.row.all.goals.against },
      ]
    : []

  return (
    <AnimatePresence>
      {team && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={team.row.team.name}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-hidden border-l border-edge bg-bg"
          >
            {/* Bannière */}
            <header className="relative shrink-0 overflow-hidden border-b border-edge bg-pitch/20 px-5 pb-5 pt-4">
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="absolute right-4 top-4 rounded-full border border-edge bg-surface p-2 text-text-2 transition-colors hover:text-text active:scale-[0.95]"
              >
                <X size={16} weight="bold" />
              </button>
              <img
                src={country.flag(team.row.team.name, team.row.team.logo, 160)}
                alt={country.label(team.row.team.name)}
                className="h-14 w-20 rounded-md object-cover shadow-[0_8px_24px_rgba(0,0,0,0.4)] ring-1 ring-edge-strong"
              />
              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                {country.label(team.row.team.name)}
              </h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-text-2">
                {t('standings.group')} {team.letter} ·{' '}
                <span className="text-live">
                  {ordinal(team.row.rank, t('drawer.years') === 'ans' ? 'fr' : 'en')}{' '}
                  {t('drawer.rank.in.group')} {team.letter}
                </span>
              </p>
            </header>

            {/* Stats rapides */}
            <div className="grid shrink-0 grid-cols-4 divide-x divide-edge border-b border-edge">
              {stats.map((stat) => (
                <div key={stat.label} className="px-3 py-3 text-center">
                  <div className="font-mono text-lg font-bold">{stat.value}</div>
                  <div className="mt-0.5 truncate text-[10px] uppercase tracking-wider text-text-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Effectif + staff */}
            <div className="min-h-0 flex-1 overflow-y-auto pb-4">
              {squad.isLoading && <SquadSkeleton />}
              {squad.isError && (
                <p className="px-5 py-6 text-sm text-text-2">{t('drawer.squad.error')}</p>
              )}
              {squad.data && (
                <>
                  <h3 className="sticky top-0 z-10 border-b border-edge bg-bg px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-2">
                    {t('drawer.players')} · {squad.data.players.length}
                  </h3>
                  {squad.data.players.length === 0 && (
                    <p className="px-5 py-6 text-sm text-text-2">{t('drawer.squad.error')}</p>
                  )}
                  {POSITION_ORDER.map(({ key, label }) => {
                    const players = squad.data.players.filter((p) => p.position === key)
                    if (players.length === 0) return null
                    return (
                      <div key={key}>
                        <h4 className="px-5 pb-1 pt-4 text-xs font-semibold text-live">
                          {t(label)}
                        </h4>
                        <ul className="divide-y divide-edge/50">
                          {players.map((player) => (
                            <PlayerRow
                              key={player.id}
                              player={player}
                              yearsLabel={t('drawer.years')}
                            />
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </>
              )}
            </div>

            {/* CTA */}
            <footer className="shrink-0 border-t border-edge p-4">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  navigate({ to: '/app/scores', search: { team: team.row.team.name } })
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-live px-4 py-3 text-sm font-bold text-[#0a0a0a] transition-transform hover:brightness-110 active:scale-[0.98]"
              >
                {t('drawer.see.matches')}
                <ArrowRight size={16} weight="bold" />
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
