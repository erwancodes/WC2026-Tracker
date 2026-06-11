import { Link } from '@tanstack/react-router'
import { Heart, SoccerBall } from '@phosphor-icons/react'

function Credit({ muted }: { muted: string }) {
  return (
    <span className={`flex items-center gap-1.5 ${muted}`}>
      Réalisé avec
      <Heart size={14} weight="fill" className="text-rose-500" />
      par{' '}
      <a
        href="https://erwanx.com"
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-current underline-offset-4 transition-opacity hover:underline hover:opacity-100"
      >
        erwanx.com
      </a>
    </span>
  )
}

/** Footer riche pour les pages marketing (landing, mentions légales) — toujours clair. */
export function MarketingFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-[#f6f7f5]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-12 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-pitch">
                <SoccerBall size={18} weight="fill" className="text-white" />
              </span>
              <span className="font-bold tracking-tight text-zinc-900">
                WC26<span className="text-[#0a8f59]"> Tracker</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Le suivi en direct de la Coupe du Monde 2026. Sans compte, sans installation —
              dans votre fuseau horaire.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            <Link to="/app" className="text-zinc-600 transition-colors hover:text-zinc-900">
              Matchs en direct
            </Link>
            <Link to="/app/standings" className="text-zinc-600 transition-colors hover:text-zinc-900">
              Classements
            </Link>
            <Link to="/app/teams" className="text-zinc-600 transition-colors hover:text-zinc-900">
              Équipes
            </Link>
            <Link to="/legal" className="text-zinc-600 transition-colors hover:text-zinc-900">
              Mentions légales
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-zinc-200 pt-6 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <Credit muted="text-zinc-500" />
          <span className="font-mono">
            Données : TheSportsDB · Drapeaux : flagcdn.com · Non affilié à la FIFA
          </span>
        </div>
      </div>
    </footer>
  )
}

/** Footer compact pour l'app — suit le thème (clair/sombre). */
export function AppFooter() {
  return (
    <footer className="mt-16 border-t border-edge">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-text-2 md:flex-row md:items-center md:justify-between">
        <Credit muted="text-text-2" />
        <div className="flex items-center gap-4 font-mono">
          <Link to="/legal" className="transition-colors hover:text-text">
            Mentions légales
          </Link>
          <span className="hidden sm:inline">Données : TheSportsDB</span>
        </div>
      </div>
    </footer>
  )
}
