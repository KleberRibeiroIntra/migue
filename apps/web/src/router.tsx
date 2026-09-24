import { Outlet, createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router'
import { AppShell } from './components/dashboard/AppShell'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { DashboardPage } from './pages/DashboardPage/DashboardPage'
import { CompetenciasPage } from './pages/CompetenciasPage/CompetenciasPage'
import { CompetenciasFormPage } from './pages/CompetenciasFormPage/CompetenciasFormPage'
import { BehaviorFormPage } from './pages/BehaviorFormPage/BehaviorFormPage'
import { BehaviorReportPage } from './pages/BehaviorReportPage/BehaviorReportPage'
import { DailyLogPage } from './pages/DailyLogPage/DailyLogPage'
import { ProjectsPage } from './pages/ProjectsPage/ProjectsPage'
import { UsersPage } from './pages/UsersPage/UsersPage'
import { UserFormPage } from './pages/UserFormPage/UserFormPage'
import { authStore } from './store/authStore'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  beforeLoad: () => {
    if (authStore.state.token) {
      throw redirect({ to: '/' })
    }
  },
  component: LoginPage,
})

// Layout sem path: exige login e renderiza o AppShell para todas as rotas autenticadas.
const authenticatedLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  beforeLoad: () => {
    if (!authStore.state.token) {
      throw redirect({ to: '/login' })
    }
  },
  component: AppShell,
})

// Tela inicial do usuário autenticado.
const homeRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/',
  component: DashboardPage,
})

const dashboardLayoutRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/dashboard',
})

// O dashboard agora é a tela inicial; mantém /dashboard funcionando para links antigos.
const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
})

const competenciasRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/competency',
  component: CompetenciasPage,
})

const competenciasFormRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/softSkills/form',
  component: CompetenciasFormPage,
})

const behaviorFormRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/behavior',
  component: BehaviorFormPage,
})

const behaviorReportRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/behavior/report',
  component: BehaviorReportPage,
})

const dailyLogRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/daily',
  component: DailyLogPage,
})

const projectsRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/projects',
  component: ProjectsPage,
})

const usersRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/users',
  component: UsersPage,
})

const userCreateRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/users/new',
  component: UserFormPage,
})

const userEditRoute = createRoute({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/users/$id',
  component: UserFormPage,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  authenticatedLayoutRoute.addChildren([
    homeRoute,
    dashboardLayoutRoute.addChildren([
      dashboardIndexRoute,
      competenciasRoute,
      behaviorFormRoute,
      behaviorReportRoute,
    ]),
    competenciasFormRoute,
    dailyLogRoute,
    projectsRoute,
    usersRoute,
    userCreateRoute,
    userEditRoute,
  ]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
