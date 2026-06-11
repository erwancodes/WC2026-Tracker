import type { Group } from '../hooks/useStandings'
import { useT } from '../lib/i18n'
import { useCountry } from '../lib/countries'

const NUM_COLS = ['J', 'G', 'N', 'P', 'BP', 'BC', 'Diff', 'Pts'] as const

function rowTint(rank: number): string {
  if (rank <= 2) return 'bg-live/10 border-l-2 border-l-live'
  if (rank === 3) return 'bg-playoff/10 border-l-2 border-l-playoff'
  return 'border-l-2 border-l-transparent'
}

/** Tableau de classement d'un groupe. Top 2 en vert (qualifiés), 3e en jaune (repêchage). */
export function GroupTable({
  group,
  onTeamClick,
}: {
  group: Group
  onTeamClick: (teamId: number) => void
}) {
  const t = useT()
  const country = useCountry()

  return (
    <section className="overflow-hidden rounded-xl border border-edge bg-surface">
      <h3 className="border-b border-edge px-4 py-3 text-sm font-bold tracking-tight">
        {t('standings.group')} {group.letter}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-edge font-mono text-[10px] uppercase tracking-wider text-text-2">
              <th className="py-2 pl-4 pr-1 text-left font-medium">#</th>
              <th className="px-1 py-2 text-left font-medium">{t('standings.col.team')}</th>
              {NUM_COLS.map((col) => (
                <th key={col} className="px-1.5 py-2 text-right font-medium last:pr-4">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {group.rows.map((row) => (
              <tr key={row.team.id} className={`${rowTint(row.rank)} border-b border-edge last:border-b-0`}>
                <td className="py-2.5 pl-4 pr-1 font-mono text-xs text-text-2">{row.rank}</td>
                <td className="px-1 py-2.5">
                  <button
                    type="button"
                    onClick={() => onTeamClick(row.team.id)}
                    className="group flex items-center gap-2 text-left transition-transform active:scale-[0.98]"
                  >
                    <img
                      src={country.flag(row.team.name, row.team.logo)}
                      alt={country.label(row.team.name)}
                      loading="lazy"
                      className="h-4 w-6 rounded-[2px] object-cover ring-1 ring-edge transition-transform group-hover:scale-110"
                    />
                    <span className="whitespace-nowrap font-medium group-hover:underline group-hover:underline-offset-2">
                      {country.label(row.team.name)}
                    </span>
                  </button>
                </td>
                {[
                  row.all.played,
                  row.all.win,
                  row.all.draw,
                  row.all.lose,
                  row.all.goals.for,
                  row.all.goals.against,
                ].map((value, i) => (
                  <td key={i} className="px-1.5 py-2.5 text-right font-mono text-xs text-text-2">
                    {value}
                  </td>
                ))}
                <td className="px-1.5 py-2.5 text-right font-mono text-xs text-text-2">
                  {row.goalsDiff > 0 ? `+${row.goalsDiff}` : row.goalsDiff}
                </td>
                <td className="px-1.5 py-2.5 pr-4 text-right font-mono text-xs font-bold text-text">
                  {row.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
