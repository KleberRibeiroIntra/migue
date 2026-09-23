import { authStore } from '../store/authStore'

const API_URL = import.meta.env.VITE_API_URL ?? 'https://localhost:7115'

export class ApiError extends Error {
  status: number
  /** Erros de validação do backend (HttpValidationProblemDetails), indexados pelo nome da propriedade. */
  errors: Record<string, string[]>

  constructor(status: number, message: string, errors: Record<string, string[]> = {}) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

async function toApiError(response: Response) {
  try {
    const body = await response.json()
    return new ApiError(
      response.status,
      body?.title ?? `Requisição falhou com status ${response.status}`,
      body?.errors ?? {},
    )
  } catch {
    return new ApiError(response.status, `Requisição falhou com status ${response.status}`)
  }
}

let onUnauthorized: (() => void) | null = null

/**
 * Registra o que fazer quando uma requisição autenticada volta 401 (token expirado ou inválido).
 * Fica como callback, e não um import do router, para evitar import circular (router -> páginas -> api).
 */
export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = authStore.state.token

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  // só quando havia token: o 401 do próprio login (senha errada) é tratado pela tela de login
  if (response.status === 401 && token) {
    onUnauthorized?.()
  }

  if (!response.ok) {
    throw await toApiError(response)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
