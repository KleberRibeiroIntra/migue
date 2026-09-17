import { apiClient } from './client'
import type { CreateProjectRequest, Project, UpdateProjectRequest } from '../types/project'

export const projectsApi = {
  list: () => apiClient.get<Project[]>('/api/projects'),
  getById: (id: string) => apiClient.get<Project>(`/api/projects/${id}`),
  create: (data: CreateProjectRequest) => apiClient.post<Project>('/api/projects', data),
  update: (id: string, data: UpdateProjectRequest) => apiClient.put<Project>(`/api/projects/${id}`, data),
  remove: (id: string) => apiClient.delete<void>(`/api/projects/${id}`),
}
