import type { Match } from '../lib/api'
import { getPhase } from '../lib/matchStatus'
import { formatDateTime } from '../lib/formatDate'
import { useSettings } from '../hooks/useSettings'
import { useT } from '../lib/i18n'

/** Badge EN COURS (+ minute, pulse) / TERMINÉ / date-heure locale pour NS. */
export function StatusBadge({ match }: { match: Match }) {
  const { settings } = useSettings()
  const t = useT()
  const { short, elapsed } = match.fixture.status
  const phase = getPhase(short)

  if (phase === 'live') {
    const label =
      short === 'HT'
        ? t('status.halftime')
        : short === 'P'
          ? t('status.penalties')
          : t('status.live')
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-live/15 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-live">
        <span className="size-1.5 rounded-full bg-live animate-pulse-live" />
        <span className="animate-pulse-live">
          {label}
          {short !== 'HT' && elapsed !== null ? ` · ${elapsed}’` : ''}
        </span>
      </span>
    )
  }

  if (phase === 'finished') {
    return (
      <span className="inline-flex items-center rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-text-2">
        {t('status.finished')}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center rounded-full bg-upcoming/15 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-upcoming">
      {formatDateTime(match.fixture.date, settings)}
    </span>
  )
}
