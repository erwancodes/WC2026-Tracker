import { motion } from 'framer-motion'
import type { Group } from '../hooks/useStandings'
import { useT } from '../lib/i18n'
import { useCountry } from '../lib/countries'

/** Grille des 48 équipes, organisées par groupe (A → L). Clic → drawer. */
export function TeamGrid({
  groups,
  onTeamClick,
}: {
  groups: Group[]
  onTeamClick: (teamId: number, letter: string) => void
}) {
  const t = useT()
  const country = useCountry()

  return (
    <div className="space-y-10">
      {groups.map((group, groupIndex) => (
        <section key={group.letter}>
          <h2 className="mb-4 flex items-baseline gap-3 border-b border-edge pb-2">
            <span className="font-mono text-2xl font-bold text-live">{group.letter}</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-2">
              {t('teams.group')} {group.letter}
            </span>
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {group.rows.map((row, i) => (
              <motion.button
                key={row.team.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 18,
                  delay: groupIndex < 2 ? i * 0.05 : 0,
                }}
                onClick={() => onTeamClick(row.team.id, group.letter)}
                className="group flex flex-col items-start gap-3 rounded-xl border border-edge bg-surface p-4 text-left transition-colors hover:border-edge-strong hover:bg-surface-2 active:scale-[0.98]"
              >
                <img
                  src={country.flag(row.team.name, row.team.logo, 80)}
                  alt={country.label(row.team.name)}
                  loading="lazy"
                  className="h-10 w-14 rounded object-cover shadow-[0_4px_14px_rgba(0,0,0,0.35)] ring-1 ring-edge transition-transform duration-300 ease-out group-hover:scale-110"
                />
                <div>
                  <div className="text-sm font-semibold leading-tight">
                    {country.label(row.team.name)}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-text-2">
                    {t('teams.group')} {group.letter}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
