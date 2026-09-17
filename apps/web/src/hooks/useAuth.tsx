import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { authApi } from '../api/authApi'
import { clearToken, getToken, setToken } from '../services/tokenStorage'
import { decodeToken } from '../utils/jwt'

interface AuthContextValue {
  userId: string | null
  email: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readInitialUser(): { userId: string | null; email: string | null } {
  const token = getToken()
  if (!token) return { userId: null, email: null }
  const decoded = decodeToken(token)
  return { userId: decoded?.userId ?? null, email: decoded?.email ?? null }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(readInitialUser)

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password })
    setToken(response.token)
    const decoded = decodeToken(response.token)
    setUser({ userId: decoded?.userId ?? null, email: decoded?.email ?? null })
  }

  const register = async (name: string, email: string, password: string) => {
    await authApi.register({ name, email, password })
    await login(email, password)
  }

  const logout = () => {
    clearToken()
    setUser({ userId: null, email: null })
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      userId: user.userId,
      email: user.email,
      isAuthenticated: user.userId !== null,
      login,
      register,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
