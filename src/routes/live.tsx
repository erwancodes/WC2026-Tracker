import { motion } from 'framer-motion'
import { ArrowClockwise } from '@phosphor-icons/react'
import { useMatches } from '../hooks/useMatches'
import { useAllMatches } from '../hooks/useAllMatches'
import { useT } from '../lib/i18n'
import { useSeo } from '../hooks/useSeo'
import { getPhase, sortMatches } from '../lib/matchStatus'
import { MatchCard } from '../components/MatchCard'
import { SkeletonCard } from '../components/SkeletonCard'
import { FeaturedPitch, FeaturedPitchSkeleton } from '../components/FeaturedPitch'
import type { Match } from '../lib/api'

function CardGrid({ matches }: { matches: Match[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {matches.map((match) => (
        <motion.div
          key={match.fixture.id}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 120, damping: 20 },
            },
          }}
        >
          <MatchCard match={match} />
        </motion.div>
      ))}
    </motion.div>
  )
}

function ErrorState({ message, onRetry }: { message?: string; onRetry: () => void }) {
  const t = useT()
  return (
    <div className="flex flex-col items-start gap-4 rounded-xl border border-edge bg-surface p-6">
      <p className="text-sm text-text-2">
        {t('live.error')}
        {message ? <span className="mt-1 block font-mono text-xs opacity-70">{message}</span> : null}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-2 rounded-lg bg-live px-4 py-2 text-sm font-bold text-[#0a0a0a] transition-transform hover:brightness-110 active:scale-[0.98]"
      >
        <ArrowClockwise size={16} weight="bold" />
        {t('live.retry')}
      </button>
    </div>
  )
}

export function LivePage() {
  const t = useT()
  useSeo({ title: `${t('live.title')} · WC26 Tracker`, description: t('live.subtitle') })
  const today = useMatches()
  const todayMatches = sortMatches(today.data ?? [])
  const noMatchToday = today.isSuccess && todayMatches.length === 0
  // Fallback : si aucun match aujourd'hui, on met en avant le prochain du tournoi.
  const all = useAllMatches({ enabled: noMatchToday })

  // Chargement initial
  if (today.isLoading || (noMatchToday && all.isLoading)) {
    return (
      <div className="space-y-10">
        <FeaturedPitchSkeleton />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  // Erreur
  if (today.isError || (noMatchToday && all.isError)) {
    const error = (today.error ?? all.error) as Error | null
    return (
      <ErrorState
        message={error?.message}
        onRetry={() => (today.isError ? today.refetch() : all.refetch())}
      />
    )
  }

  // Sélection du match vedette + des autres matchs à lister
  let featured: Match | undefined
  let rest: Match[]
  let restTitle: string

  if (todayMatches.length > 0) {
    featured = todayMatches[0]
    rest = todayMatches.slice(1)
    restTitle = t('live.others')
  } else {
    const upcoming = sortMatches(all.data ?? []).filter(
      (m) => getPhase(m.fixture.status.short) === 'upcoming',
    )
    featured = upcoming[0]
    rest = upcoming.slice(1, 6)
    restTitle = t('live.next.matches')
  }

  if (!featured) {
    return (
      <p className="rounded-xl border border-edge bg-surface px-5 py-10 text-center text-sm text-text-2">
        {t('live.no.upcoming')}
      </p>
    )
  }

  return (
    <div className="space-y-10">
      <FeaturedPitch match={featured} />

      {rest.length > 0 && (
        <section>
          <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-text-2">
            {restTitle}
          </h2>
          <CardGrid matches={rest} />
        </section>
      )}
    </div>
  )
}

/** En-tête de page réutilisé par les autres écrans de l'app. */
export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-1.5 max-w-[65ch] text-sm text-text-2">{subtitle}</p>
    </header>
  )
}
