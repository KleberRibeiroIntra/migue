const TOKEN_KEY = 'migue_token'

let cachedToken: string | null = localStorage.getItem(TOKEN_KEY)

export function getToken(): string | null {
  return cachedToken
}

export function setToken(token: string): void {
  cachedToken = token
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  cachedToken = null
  localStorage.removeItem(TOKEN_KEY)
}
