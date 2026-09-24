import { createCrudApi } from './crudApi'

export interface ProjectDto {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string | null
  active: boolean
}

export interface ProjectRequest {
  name: string
  description: string | null
}

export const projectApi = createCrudApi<ProjectDto, ProjectRequest>('Project')
