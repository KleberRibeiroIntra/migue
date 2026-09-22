import { ActivityTable } from './ActivityTable'
import { DashboardHeader } from './DashboardHeader'
import { StatsGrid } from './StatsGrid'

export function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <StatsGrid />
      <ActivityTable />
    </>
  )
}
