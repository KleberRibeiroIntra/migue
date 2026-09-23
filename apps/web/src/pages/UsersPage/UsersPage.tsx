import { useNavigate } from '@tanstack/react-router'
import { CrudPage } from '../../components/crud/CrudPage'
import { userCrudConfig } from './userCrudConfig'

export function UsersPage() {
  const navigate = useNavigate()

  return (
    <CrudPage
      config={userCrudConfig}
      onCreate={() => navigate({ to: '/users/new' })}
      onEdit={(user) => navigate({ to: '/users/$id', params: { id: user.id } })}
    />
  )
}
