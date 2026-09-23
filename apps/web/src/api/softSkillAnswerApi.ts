import { apiFetch } from './client'

export interface SoftSkillAnswerDto {
  id: string
  softSkillId: string
  softSkillOptionId: string
  value: number
  label: string
  createdAt: string
}

export interface SoftSkillAnswerRequest {
  softSkillId: string
  softSkillOptionId: string
}

/** Resposta mais recente do usuário autenticado para cada soft skill. */
export function getMySoftSkillAnswers() {
  return apiFetch<SoftSkillAnswerDto[]>('/SoftSkill/answers/me')
}

/** Salva uma nova rodada de respostas; as anteriores ficam como histórico no backend. */
export function saveMySoftSkillAnswers(answers: SoftSkillAnswerRequest[]) {
  return apiFetch<SoftSkillAnswerDto[]>('/SoftSkill/answers', {
    method: 'POST',
    body: JSON.stringify({ answers }),
  })
}
