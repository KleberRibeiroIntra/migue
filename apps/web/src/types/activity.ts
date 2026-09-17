export type ActivityStatus = 'Planned' | 'InProgress' | 'Completed' | 'Blocked' | 'Cancelled'

export const ACTIVITY_STATUSES: ActivityStatus[] = [
  'Planned',
  'InProgress',
  'Completed',
  'Blocked',
  'Cancelled',
]

export interface Activity {
  id: string
  userId: string
  projectId: string | null
  title: string
  description: string | null
  status: ActivityStatus
  startedAt: string | null
  finishedAt: string | null
  durationMinutes: number | null
  selfScore: number | null
  selfScoreComment: string | null
  createdAt: string
  updatedAt: string | null
}

export interface CreateActivityRequest {
  projectId?: string | null
  title: string
  description?: string | null
  status: ActivityStatus
  startedAt?: string | null
  finishedAt?: string | null
  durationMinutes?: number | null
  selfScore?: number | null
  selfScoreComment?: string | null
}

export interface UpdateActivityRequest {
  projectId?: string | null
  title: string
  description?: string | null
  status: ActivityStatus
  startedAt?: string | null
  finishedAt?: string | null
  durationMinutes?: number | null
  selfScore?: number | null
  selfScoreComment?: string | null
}
