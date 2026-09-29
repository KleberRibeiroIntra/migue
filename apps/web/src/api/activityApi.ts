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
  categoryId: string
  categoryName: string
  sentiment: ScoreReasonSentiment
  order: number
  /** Quando escolhida, o comentário vira obrigatório (ex: "Outro"). */
  requiresComment: boolean
}

export interface ActivityDto {
  id: string
  userId: string
  title: string
  description: string | null
  status: ActivityStatus
  startedAt: string | null
  finishedAt: string | null
  durationMinutes: number | null
  selfScore: number | null
  selfScoreComment: string | null
  createdAt: string
  projects: ProjectDto[]
  scoreReasons: ScoreReasonDto[]
}

export interface ActivityRequest {
  userId: string
  projectIds: string[]
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

/** Tira a autoavaliação da atividade (nota, comentário e justificativas). */
export function clearActivityScore(id: string) {
  return apiFetch<ActivityDto>(`/Activity/${id}/score`, { method: 'DELETE' })
}

/** Catálogo de justificativas na ordem de exibição. */
export function getScoreReasons() {
  return apiFetch<ScoreReasonDto[]>('/ScoreReason')
}

/** Atividades do usuário logado cujo dia cai em [from, to), mais recentes primeiro. */
export function getMyActivities(from: Date, to: Date) {
  const params = new URLSearchParams({ from: from.toISOString(), to: to.toISOString() })
  return apiFetch<ActivityDto[]>(`/Activity/me?${params}`)
}
