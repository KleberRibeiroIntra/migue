import { apiClient } from './client';
import { CreateProjectRequest, Project, UpdateProjectRequest } from '../types';

export const projectsApi = {
  list: (token: string) => apiClient.get<Project[]>('/projects', token),
  getById: (id: string, token: string) => apiClient.get<Project>(`/projects/${id}`, token),
  create: (data: CreateProjectRequest, token: string) =>
    apiClient.post<Project>('/projects', data, token),
  update: (id: string, data: UpdateProjectRequest, token: string) =>
    apiClient.put<Project>(`/projects/${id}`, data, token),
  remove: (id: string, token: string) => apiClient.delete<void>(`/projects/${id}`, token),
};
