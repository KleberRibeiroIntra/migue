export interface Project {
  id: string
  name: string
  description: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string | null
}

export interface CreateProjectRequest {
  name: string
  description?: string | null
}

export interface UpdateProjectRequest {
  name: string
  description?: string | null
  isActive: boolean
}
