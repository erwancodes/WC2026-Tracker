import { Link } from '@tanstack/react-router'
import {
  Broadcast,
  GearSix,
  GlobeHemisphereWest,
  ListNumbers,
  SoccerBall,
  Trophy,
  type Icon,
} from '@phosphor-icons/react'
import { useT, type TranslationKey } from '../lib/i18n'

const LINKS: { to: string; label: TranslationKey; icon: Icon; exact: boolean }[] = [
  { to: '/app', label: 'nav.live', icon: Broadcast, exact: true },
  { to: '/app/scores', label: 'nav.scores', icon: ListNumbers, exact: false },
  { to: '/app/standings', label: 'nav.standings', icon: Trophy, exact: false },
  { to: '/app/teams', label: 'nav.teams', icon: GlobeHemisphereWest, exact: false },
]

/** Top navbar fixe — desktop. Pilule de navigation centrée, look « segmented ». */
export function Navbar() {
  const t = useT()

  return (
    <header className="fixed inset-x-0 top-0 z-30 hidden border-b border-edge bg-bg/80 backdrop-blur-xl md:block">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-pitch">
            <SoccerBall size={18} weight="fill" className="text-white" />
          </span>
          <span className="text-sm font-bold tracking-tight">
            WC26<span className="text-live"> Tracker</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 rounded-full border border-edge bg-surface/60 p-1">
          {LINKS.map((link) => {
            const IconComponent = link.icon
            return (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.exact }}
                activeProps={{ className: 'bg-surface-2 text-text shadow-sm' }}
                inactiveProps={{ className: 'text-text-2 hover:text-text' }}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors"
              >
                <IconComponent size={16} weight="bold" />
                {t(link.label)}
              </Link>
            )
          })}
        </div>

        <Link
          to="/app/settings"
          aria-label={t('nav.settings')}
          activeProps={{ className: 'border-edge-strong bg-surface-2 text-text' }}
          inactiveProps={{ className: 'border-edge text-text-2 hover:text-text' }}
          className="flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors"
        >
          <GearSix size={18} weight="bold" />
        </Link>
      </nav>
    </header>
  )
}
