import { apiClient } from './client';
import { Activity, ActivityStatus, CreateActivityRequest, UpdateActivityRequest } from '../types';

export const activitiesApi = {
  list: (token: string, status?: ActivityStatus) =>
    apiClient.get<Activity[]>(status ? `/activities?status=${status}` : '/activities', token),
  getById: (id: string, token: string) => apiClient.get<Activity>(`/activities/${id}`, token),
  create: (data: CreateActivityRequest, token: string) =>
    apiClient.post<Activity>('/activities', data, token),
  update: (id: string, data: UpdateActivityRequest, token: string) =>
    apiClient.put<Activity>(`/activities/${id}`, data, token),
  remove: (id: string, token: string) => apiClient.delete<void>(`/activities/${id}`, token),
};
