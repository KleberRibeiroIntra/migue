import { apiClient } from './client'
import type { UpdateUserRequest, User } from '../types/user'

export const usersApi = {
  getById: (id: string) => apiClient.get<User>(`/api/users/${id}`),
  update: (id: string, data: UpdateUserRequest) => apiClient.put<User>(`/api/users/${id}`, data),
}
