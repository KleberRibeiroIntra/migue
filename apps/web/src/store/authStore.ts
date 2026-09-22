import { Store } from '@tanstack/store'

export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface AuthState {
  token: string | null
  user: AuthUser | null
}

const STORAGE_KEY = 'migue.auth'

function loadInitialState(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as AuthState
  } catch {
    // ignora armazenamento corrompido
  }
  return { token: null, user: null }
}

export const authStore = new Store<AuthState>(loadInitialState())

export function setAuth(token: string, user: AuthUser) {
  const state: AuthState = { token, user }
  authStore.setState(() => state)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearAuth() {
  authStore.setState(() => ({ token: null, user: null }))
  localStorage.removeItem(STORAGE_KEY)
}
