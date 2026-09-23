import { createCrudApi } from './crudApi'

export interface UserDto {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string | null
  active: boolean
}

export interface UserRequest {
  name: string
  email: string
  /** Vazia no update mantém a senha atual. */
  password: string
}

export const userApi = createCrudApi<UserDto, UserRequest>('User')
