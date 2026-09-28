import { ActivityStatus } from '../api/activityApi'

/** Rótulo e cor de badge de cada status; a cor sempre vai junto do rótulo, nunca sozinha. */
export const ACTIVITY_STATUS: Record<ActivityStatus, { label: string; color: string }> = {
  [ActivityStatus.Completed]: { label: 'Entreguei', color: 'green' },
  [ActivityStatus.InProgress]: { label: 'Tô fazendo', color: 'blue' },
  [ActivityStatus.Blocked]: { label: 'Travou', color: 'red' },
  [ActivityStatus.Planned]: { label: 'Nem comecei', color: 'gray' },
  [ActivityStatus.Cancelled]: { label: 'Cancelaram', color: 'gray' },
}
