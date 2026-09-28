import { createCrudApi } from './crudApi'

export interface ScoreReasonCategoryDto {
  id: string
  name: string
  description: string | null
  order: number
  createdAt: string
  updatedAt: string | null
  active: boolean
}

export interface ScoreReasonCategoryRequest {
  name: string
  description: string | null
  order: number
}

export const scoreReasonCategoryApi = createCrudApi<ScoreReasonCategoryDto, ScoreReasonCategoryRequest>('ScoreReasonCategory')

