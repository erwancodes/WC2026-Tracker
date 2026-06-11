import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { AppLayout, RootLayout } from './routes/__root'
import { LandingPage } from './routes/landing'
import { LegalPage } from './routes/legal'
import { LivePage } from './routes/live'
import { ScoresPage } from './routes/scores'
import { StandingsPage } from './routes/standings'
import { TeamsPage } from './routes/teams'
import { SettingsPage } from './routes/settings'

const rootRoute = createRootRoute({ component: RootLayout })

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
})

const legalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal',
  component: LegalPage,
})

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  component: AppLayout,
})

const liveRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/',
  component: LivePage,
})

const scoresRoute = createRoute({
  getParentRoute: () => appRoute,
  path: 'scores',
  component: ScoresPage,
  validateSearch: (search: Record<string, unknown>): { team?: string } => ({
    team: typeof search.team === 'string' && search.team ? search.team : undefined,
  }),
})

const standingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: 'standings',
  component: StandingsPage,
})

const teamsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: 'teams',
  component: TeamsPage,
})

const settingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: 'settings',
  component: SettingsPage,
})

const routeTree = rootRoute.addChildren([
  landingRoute,
  legalRoute,
  appRoute.addChildren([liveRoute, scoresRoute, standingsRoute, teamsRoute, settingsRoute]),
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
