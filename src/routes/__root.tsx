import { Outlet, useLocation } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { BottomNav } from '../components/BottomNav'
import { NextMatchBar } from '../components/NextMatchBar'
import { AppFooter } from '../components/Footer'

/** Racine : la landing (/) est autonome, le layout app est porté par AppLayout. */
export function RootLayout() {
  return <Outlet />
}

/** Layout commun à toutes les pages /app : navbar desktop + bottom nav mobile. */
export function AppLayout() {
  // La page Live (/app) affiche déjà le match vedette en plein écran : la barre y
  // serait redondante. On la garde sur tous les autres écrans.
  const { pathname } = useLocation()
  const showBar = pathname.replace(/\/$/, '') !== '/app'

  return (
    <div className="min-h-[100dvh] bg-bg text-text">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pt-8 md:pt-24">
        {showBar && <NextMatchBar />}
        <Outlet />
      </main>
      <div className="px-4 pb-28 md:pb-10">
        <AppFooter />
      </div>
      <BottomNav />
    </div>
  )
}
