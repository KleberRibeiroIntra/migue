import { Avatar, Badge, HStack, Text } from '@chakra-ui/react'
import { type UserDto, type UserRequest, userApi } from '../../api/userApi'
import type { CrudConfig } from '../../components/crud/types'

type UserForm = {
  name: string
  email: string
  password: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const userCrudConfig: CrudConfig<UserDto, UserRequest, UserForm> = {
  queryKey: 'users',
  api: userApi,
  title: 'Usuários',
  description: 'Quem tem acesso ao migué.',
  entityLabel: 'usuário',
  columns: [
    {
      header: 'Nome',
      render: (user) => (
        <HStack gap="8px">
          <Avatar.Root size="xs">
            <Avatar.Fallback name={user.name} />
          </Avatar.Root>
          <Text fontWeight="600">{user.name}</Text>
        </HStack>
      ),
    },
    { header: 'E-mail', render: (user) => user.email },
    {
      header: 'Status',
      render: (user) => (
        <Badge colorPalette={user.active ? 'green' : 'gray'}>{user.active ? 'Ativo' : 'Inativo'}</Badge>
      ),
    },
    {
      header: 'Criado em',
      render: (user) => (
        <Text color="var(--migue-muted)">{new Date(user.createdAt).toLocaleDateString('pt-BR')}</Text>
      ),
    },
  ],
  fields: [
    { name: 'name', label: 'Nome', required: true, placeholder: 'Nome completo' },
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
      required: true,
      placeholder: 'nome@empresa.com.br',
      validate: (value) => (EMAIL_PATTERN.test(value) ? undefined : 'E-mail inválido.'),
    },
    {
      name: 'password',
      label: 'Senha',
      type: 'password',
      errorKey: 'PasswordHash',
      required: (mode) => mode === 'create',
      helperText: (mode) => (mode === 'edit' ? 'Deixe em branco para manter a senha atual.' : undefined),
      validate: (value) => (value && value.length < 6 ? 'A senha precisa ter pelo menos 6 caracteres.' : undefined),
    },
  ],
  emptyForm: { name: '', email: '', password: '' },
  toForm: (user) => ({ name: user.name, email: user.email, password: '' }),
  toRequest: (values) => ({ name: values.name.trim(), email: values.email.trim(), password: values.password }),
  getItemLabel: (user) => user.name,
}
