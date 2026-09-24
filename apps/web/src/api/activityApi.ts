import { apiFetch } from './client'
import { createCrudApi } from './crudApi'
import type { ProjectDto } from './projectApi'

/** Espelha o enum ActivityStatus do backend (serializado como número). */
export const ActivityStatus = {
  Planned: 0,
  InProgress: 1,
  Completed: 2,
  Blocked: 3,
  Cancelled: 4,
} as const
export type ActivityStatus = (typeof ActivityStatus)[keyof typeof ActivityStatus]

/** Espelha o enum ScoreReasonSentiment do backend. */
export const ScoreReasonSentiment = {
  Negative: 0,
  Positive: 1,
} as const
export type ScoreReasonSentiment = (typeof ScoreReasonSentiment)[keyof typeof ScoreReasonSentiment]

/** A partir dessa nota as justificativas são as positivas (mesma regra do ActivityService). */
export const POSITIVE_SCORE_THRESHOLD = 4

export interface ScoreReasonDto {
  id: string
  description: string
  category: number
  sentiment: ScoreReasonSentiment
  order: number
  /** Quando escolhida, o comentário vira obrigatório (ex: "Outro"). */
  requiresComment: boolean
}

export interface ActivityDto {
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
  project: ProjectDto | null
  scoreReasons: ScoreReasonDto[]
}

export interface ActivityRequest {
  userId: string
  projectId: string | null
  title: string
  description: string | null
  status: ActivityStatus
  startedAt: string | null
  finishedAt: string | null
  durationMinutes: number | null
}

export interface ScoreActivityRequest {
  selfScore: number
  selfScoreComment: string | null
  scoreReasonIds: string[]
}

export const activityApi = createCrudApi<ActivityDto, ActivityRequest>('Activity')

export function scoreActivity(id: string, request: ScoreActivityRequest) {
  return apiFetch<ActivityDto>(`/Activity/${id}/score`, { method: 'PUT', body: JSON.stringify(request) })
}

/** Catálogo de justificativas na ordem de exibição. */
export function getScoreReasons() {
  return apiFetch<ScoreReasonDto[]>('/ScoreReason')
}
