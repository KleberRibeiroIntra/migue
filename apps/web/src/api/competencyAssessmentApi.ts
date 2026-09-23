import { apiFetch } from './client'

/** Espelha o enum CompetencyAssessmentStatus do backend. */
export const AssessmentStatus = {
  Draft: 0,
  Submitted: 1,
} as const

export type AssessmentStatus = (typeof AssessmentStatus)[keyof typeof AssessmentStatus]

export interface CompetencyAnswerDto {
  competencyQuestionId: string
  competencyQuestionOptionId: string
}

export interface CompetencyAssessmentDto {
  id: string
  status: AssessmentStatus
  createdAt: string
  updatedAt: string | null
  submittedAt: string | null
  answers: CompetencyAnswerDto[]
}

/** Rascunho em andamento ou último envio; null se o usuário nunca respondeu (a API devolve 204). */
export async function getMyCompetencyAssessment() {
  return (await apiFetch<CompetencyAssessmentDto | undefined>('/Competency/assessment/me')) ?? null
}

export function saveMyCompetencyAnswer(answer: CompetencyAnswerDto) {
  return apiFetch<CompetencyAssessmentDto>('/Competency/assessment/me/answers', {
    method: 'PUT',
    body: JSON.stringify(answer),
  })
}

export function submitMyCompetencyAssessment() {
  return apiFetch<CompetencyAssessmentDto>('/Competency/assessment/me/submit', { method: 'POST' })
}

export function restartMyCompetencyAssessment() {
  return apiFetch<CompetencyAssessmentDto>('/Competency/assessment/me/restart', { method: 'POST' })
}
