import type { AuthUser } from '../store/authStore'
import { apiFetch } from './client'

export interface LoginResult {
  token: string
  expiresAt: string
  user: AuthUser
}

export function login(email: string, password: string) {
  return apiFetch<LoginResult>('/Auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}
