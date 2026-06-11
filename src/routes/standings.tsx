import { useMemo, useState } from 'react'
import { ArrowClockwise } from '@phosphor-icons/react'
import { useStandings } from '../hooks/useStandings'
import { useSettings } from '../hooks/useSettings'
import { useT } from '../lib/i18n'
import { useSeo } from '../hooks/useSeo'
import { formatTime } from '../lib/formatDate'
import { GroupTable } from '../components/GroupTable'
import { TeamDrawer, type DrawerTeam } from '../components/TeamDrawer'
import { PageHeader } from './live'

const GROUP_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

function GroupSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-edge bg-surface">
      <div className="border-b border-edge px-4 py-3">
        <div className="skeleton h-4 w-24 rounded" />
      </div>
      <div className="space-y-3 p-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="skeleton size-5 rounded-sm" />
            <div className="skeleton h-3 flex-1 rounded" />
            <div className="skeleton h-3 w-8 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function StandingsPage() {
  const t = useT()
  useSeo({ title: `${t('standings.title')} · WC26 Tracker`, description: t('standings.subtitle') })
  const { settings } = useSettings()
  const standings = useStandings()
  const [filter, setFilter] = useState<string>('all')
  const [drawerTeam, setDrawerTeam] = useState<DrawerTeam | null>(null)

  const visible = useMemo(() => {
    const groups = standings.data ?? []
    return filter === 'all' ? groups : groups.filter((g) => g.letter === filter)
  }, [standings.data, filter])

  const openTeam = (teamId: number) => {
    for (const group of standings.data ?? []) {
      const row = group.rows.find((r) => r.team.id === teamId)
      if (row) {
        setDrawerTeam({ row, letter: group.letter })
        return
      }
    }
  }

  return (
    <div>
      <PageHeader title={t('standings.title')} subtitle={t('standings.subtitle')} />

      {/* Sélecteur de groupe */}
      <div className="mb-6 flex flex-wrap items-center gap-1.5">
        {[
          ['all', t('standings.all.groups')] as const,
          ...GROUP_LETTERS.map((letter) => [letter, letter] as const),
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-full border px-3 py-1 font-mono text-xs font-medium transition-colors active:scale-[0.97] ${
              filter === value
                ? 'border-live bg-live/15 text-live'
                : 'border-edge bg-surface text-text-2 hover:border-edge-strong hover:text-text'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Légende */}
      <div className="mb-6 flex flex-wrap items-center gap-4 font-mono text-[11px] text-text-2">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-live/60" />
          {t('standings.legend.qualified')}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-playoff/60" />
          {t('standings.legend.playoff')}
        </span>
      </div>

      {standings.isLoading && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <GroupSkeleton key={i} />
          ))}
        </div>
      )}

      {standings.isError && (
        <div className="flex flex-col items-start gap-4 rounded-xl border border-edge bg-surface p-6">
          <p className="text-sm text-text-2">
            {t('standings.empty')}
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

      {standings.isSuccess && visible.length === 0 && (
        <p className="rounded-xl border border-edge bg-surface px-5 py-8 text-center text-sm text-text-2">
          {t('standings.empty')}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {visible.map((group) => (
          <GroupTable key={group.letter} group={group} onTeamClick={openTeam} />
        ))}
      </div>

      {standings.dataUpdatedAt > 0 && (
        <p className="mt-8 text-center font-mono text-[11px] text-text-2">
          {t('standings.updated.at')}{' '}
          {formatTime(new Date(standings.dataUpdatedAt).toISOString(), settings)}
        </p>
      )}

      <TeamDrawer team={drawerTeam} onClose={() => setDrawerTeam(null)} />
    </div>
  )
}
