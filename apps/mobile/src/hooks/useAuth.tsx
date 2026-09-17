import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/authApi';
import { authStorage } from '../services/authStorage';
import { LoginRequest, RegisterRequest } from '../types';

interface AuthContextValue {
  token: string | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authStorage.getToken().then((storedToken) => {
      setToken(storedToken);
      setIsLoading(false);
    });
  }, []);

  const login = async (data: LoginRequest) => {
    const response = await authApi.login(data);
    await authStorage.setToken(response.token);
    setToken(response.token);
  };

  const register = async (data: RegisterRequest) => {
    await authApi.register(data);
    await login({ email: data.email, password: data.password });
  };

  const logout = async () => {
    await authStorage.clearToken();
    setToken(null);
  };

  const value = useMemo(
    () => ({ token, isLoading, login, register, logout }),
    [token, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
