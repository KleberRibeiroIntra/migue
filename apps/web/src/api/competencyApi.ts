import { apiFetch } from './client'
import type { PagedResult } from './crudApi'

export interface CompetencyQuestionOptionDto {
  id: string
  text: string
  order: number
}

export interface CompetencyQuestionDto {
  id: string
  text: string
  order: number
  options: CompetencyQuestionOptionDto[]
}

export interface CompetencyDto {
  id: string
  name: string
  order: number
  createdAt: string
  updatedAt: string | null
  active: boolean
  questions: CompetencyQuestionDto[]
}

export async function getCompetencies(): Promise<CompetencyDto[]> {
  const paged = await apiFetch<PagedResult<CompetencyDto>>('/Competency/paged?PageSize=50&PageNumber=0')
  return [...paged.result].sort((a, b) => a.order - b.order)
}
