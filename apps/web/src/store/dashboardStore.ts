import { Store } from '@tanstack/store'

export interface DashboardState {
  deliveredOnTime: number
  gaveMigue: number
  pendingReports: number
  activeProjects: number
}

export const dashboardStore = new Store<DashboardState>({
  deliveredOnTime: 12,
  gaveMigue: 3,
  pendingReports: 2,
  activeProjects: 5,
})

export function requestNewReport() {
  dashboardStore.setState((state) => ({
    ...state,
    pendingReports: state.pendingReports + 1,
  }))
}
