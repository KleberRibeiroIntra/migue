import { apiClient } from './client';
import { LoginRequest, LoginResponse, RegisterRequest } from '../types';

export const authApi = {
  register: (data: RegisterRequest) => apiClient.post<{ id: string }>('/auth/register', data),
  login: (data: LoginRequest) => apiClient.post<LoginResponse>('/auth/login', data),
};
