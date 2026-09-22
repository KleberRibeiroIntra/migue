import { apiFetch } from './client'

export interface SoftSkillOptionDto {
  id: string
  value: number
  label: string
  order: number
}

export interface SoftSkillDto {
  id: string
  name: string
  note: string
  order: number
  createdAt: string
  updatedAt: string | null
  active: boolean
  options: SoftSkillOptionDto[]
}

interface PagedResult<T> {
  pageSize: number
  pageNumber: number
  totalRows: number
  result: T[]
}

export async function getSoftSkills(): Promise<SoftSkillDto[]> {
  const paged = await apiFetch<PagedResult<SoftSkillDto>>('/SoftSkill/paged?PageSize=50&PageNumber=0')
  return [...paged.result].sort((a, b) => a.order - b.order)
}
