export interface User {
  id: string
  name: string
  email: string
  isActive: boolean
  createdAt: string
  updatedAt: string | null
}

export interface UpdateUserRequest {
  name: string
  isActive: boolean
}
