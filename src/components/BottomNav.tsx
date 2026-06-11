import { Link } from '@tanstack/react-router'
import {
  Broadcast,
  GearSix,
  GlobeHemisphereWest,
  ListNumbers,
  Trophy,
  type Icon,
} from '@phosphor-icons/react'
import { useT, type TranslationKey } from '../lib/i18n'

const LINKS: { to: string; label: TranslationKey; icon: Icon; exact: boolean }[] = [
  { to: '/app', label: 'nav.live', icon: Broadcast, exact: true },
  { to: '/app/scores', label: 'nav.scores', icon: ListNumbers, exact: false },
  { to: '/app/standings', label: 'nav.standings', icon: Trophy, exact: false },
  { to: '/app/teams', label: 'nav.teams', icon: GlobeHemisphereWest, exact: false },
  { to: '/app/settings', label: 'nav.settings', icon: GearSix, exact: false },
]

/** Bottom nav bar — mobile. Pastille active surlignée derrière l'icône. */
export function BottomNav() {
  const t = useT()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-edge bg-bg/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {LINKS.map((link) => {
          const IconComponent = link.icon
          return (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.exact }}
              activeProps={{ className: 'text-live' }}
              inactiveProps={{ className: 'text-text-2' }}
              className="group flex flex-col items-center gap-1 py-2.5 transition-colors active:scale-[0.95]"
            >
              <span className="flex h-7 w-12 items-center justify-center rounded-full transition-colors group-data-[status=active]:bg-live/12">
                <IconComponent size={20} weight="bold" />
              </span>
              <span className="text-[10px] font-medium leading-none">{t(link.label)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
