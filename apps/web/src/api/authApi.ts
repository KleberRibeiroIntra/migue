import { apiClient } from './client'
import type { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth'

export const authApi = {
  register: (data: RegisterRequest) => apiClient.post<{ id: string }>('/api/auth/register', data),
  login: (data: LoginRequest) => apiClient.post<LoginResponse>('/api/auth/login', data),
}
