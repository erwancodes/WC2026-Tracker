import { useState } from 'react'
import { ArrowClockwise } from '@phosphor-icons/react'
import { useStandings } from '../hooks/useStandings'
import { useT } from '../lib/i18n'
import { TeamGrid } from '../components/TeamGrid'
import { TeamDrawer, type DrawerTeam } from '../components/TeamDrawer'
import { PageHeader } from './live'

function TeamsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="rounded-xl border border-edge bg-surface p-4">
          <div className="skeleton h-10 w-14 rounded" />
          <div className="skeleton mt-3 h-3 w-24 rounded" />
          <div className="skeleton mt-2 h-2.5 w-16 rounded" />
        </div>
      ))}
    </div>
  )
}

export function TeamsPage() {
  const t = useT()
  const standings = useStandings()
  const [drawerTeam, setDrawerTeam] = useState<DrawerTeam | null>(null)

  const openTeam = (teamId: number, letter: string) => {
    const group = standings.data?.find((g) => g.letter === letter)
    const row = group?.rows.find((r) => r.team.id === teamId)
    if (row) setDrawerTeam({ row, letter })
  }

  return (
    <div>
      <PageHeader title={t('teams.title')} subtitle={t('teams.subtitle')} />

      {standings.isLoading && <TeamsSkeleton />}

      {standings.isError && (
        <div className="flex flex-col items-start gap-4 rounded-xl border border-edge bg-surface p-6">
          <p className="text-sm text-text-2">
            {t('live.error')}
            <span className="mt-1 block font-mono text-xs opacity-70">
              {(standings.error as Error).message}
            </span>
          </p>
          <button
            type="button"
            onClick={() => standings.refetch()}
            className="flex items-center gap-2 rounded-lg bg-live px-4 py-2 text-sm font-bold text-[#0a0a0a] transition-transform hover:brightness-110 active:scale-[0.98]"
          >
            <ArrowClockwise size={16} weight="bold" />
            {t('live.retry')}
          </button>
        </div>
      )}

      {standings.data && <TeamGrid groups={standings.data} onTeamClick={openTeam} />}

      <TeamDrawer team={drawerTeam} onClose={() => setDrawerTeam(null)} />
    </div>
  )
}
