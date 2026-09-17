import { apiClient } from './client';
import { User } from '../types';

export interface UpdateUserRequest {
  name: string;
  isActive: boolean;
}

export const usersApi = {
  getById: (id: string, token: string) => apiClient.get<User>(`/users/${id}`, token),
  update: (id: string, data: UpdateUserRequest, token: string) =>
    apiClient.put<User>(`/users/${id}`, data, token),
};
