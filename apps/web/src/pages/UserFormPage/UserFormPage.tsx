import { useNavigate, useParams } from '@tanstack/react-router'
import { CrudFormPage } from '../../components/crud/CrudFormPage'
import { userCrudConfig } from '../UsersPage/userCrudConfig'

/** Atende /users/new (criação) e /users/$id (edição). */
export function UserFormPage() {
  const navigate = useNavigate()
  const { id } = useParams({ strict: false })

  return <CrudFormPage config={userCrudConfig} id={id} onDone={() => navigate({ to: '/users' })} />
}
