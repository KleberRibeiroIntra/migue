import { Outlet, createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router'
import { AppShell } from './components/dashboard/AppShell'
import { HomePage } from './pages/HomePage/HomePage'
import { DashboardPage } from './pages/DashboardPage/DashboardPage'
import { CompetenciasPage } from './pages/CompetenciasPage/CompetenciasPage'
import { CompetenciasFormPage } from './pages/CompetenciasFormPage/CompetenciasFormPage'
import { BehaviorFormPage } from './pages/BehaviorFormPage/BehaviorFormPage'
import { authStore } from './store/authStore'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: () => {
    if (!authStore.state.token) {
      throw redirect({ to: '/' })
    }
  },
  component: AppShell,
})

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/',
  component: DashboardPage,
})

const competenciasRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/competency',
  component: CompetenciasPage,
})

const competenciasFormRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/competency/form',
  component: CompetenciasFormPage,
})

const behaviorFormRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/behavior',
  component: BehaviorFormPage,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  dashboardLayoutRoute.addChildren([
    dashboardIndexRoute,
    competenciasRoute,
    competenciasFormRoute,
    behaviorFormRoute,
  ]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
