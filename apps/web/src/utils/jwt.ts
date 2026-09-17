const NAME_IDENTIFIER_CLAIM = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
const EMAIL_CLAIM = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'

export interface DecodedToken {
  userId: string
  email: string
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    const payload = token.split('.')[1]
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    const userId = json[NAME_IDENTIFIER_CLAIM] ?? json.sub ?? json.nameid
    const email = json[EMAIL_CLAIM] ?? json.email
    if (!userId) return null
    return { userId, email: email ?? '' }
  } catch {
    return null
  }
}
