import { Text } from '@chakra-ui/react'
import { type ProjectDto, type ProjectRequest, projectApi } from '../../api/projectApi'
import type { CrudConfig } from '../../components/crud/types'

type ProjectForm = {
  name: string
  description: string
}

export const projectCrudConfig: CrudConfig<ProjectDto, ProjectRequest, ProjectForm> = {
  queryKey: 'projects',
  api: projectApi,
  title: 'Projetos',
  description: 'Onde suas atividades moram. Cadastra aqui pra escolher no registro do dia.',
  entityLabel: 'projeto',
  columns: [
    { header: 'Nome', render: (project) => <Text fontWeight="600">{project.name}</Text> },
    {
      header: 'Descrição',
      render: (project) => (
        <Text color="var(--migue-muted)" lineClamp={1}>
          {project.description || '—'}
        </Text>
      ),
    },
    {
      header: 'Criado em',
      width: '140px',
      render: (project) => (
        <Text color="var(--migue-muted)">{new Date(project.createdAt).toLocaleDateString('pt-BR')}</Text>
      ),
    },
  ],
  fields: [
    {
      name: 'name',
      label: 'Nome',
      required: true,
      placeholder: 'Ex: App mobile',
      validate: (value) => (value.trim().length > 200 ? 'Nome grande demais, até 200 caracteres.' : undefined),
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
      placeholder: 'Do que se trata, pra quem é, qualquer coisa que ajude a lembrar',
      validate: (value) => (value.length > 2000 ? 'Descrição grande demais, até 2000 caracteres.' : undefined),
    },
  ],
  emptyForm: { name: '', description: '' },
  toForm: (project) => ({ name: project.name, description: project.description ?? '' }),
  toRequest: (values) => ({ name: values.name.trim(), description: values.description.trim() || null }),
  getItemLabel: (project) => project.name,
}
