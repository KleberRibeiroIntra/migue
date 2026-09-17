import { apiClient } from './client'
import type { Activity, ActivityStatus, CreateActivityRequest, UpdateActivityRequest } from '../types/activity'

export const activitiesApi = {
  list: (status?: ActivityStatus) => {
    const query = status ? `?status=${status}` : ''
    return apiClient.get<Activity[]>(`/api/activities${query}`)
  },
  getById: (id: string) => apiClient.get<Activity>(`/api/activities/${id}`),
  create: (data: CreateActivityRequest) => apiClient.post<Activity>('/api/activities', data),
  update: (id: string, data: UpdateActivityRequest) => apiClient.put<Activity>(`/api/activities/${id}`, data),
  remove: (id: string) => apiClient.delete<void>(`/api/activities/${id}`),
}
