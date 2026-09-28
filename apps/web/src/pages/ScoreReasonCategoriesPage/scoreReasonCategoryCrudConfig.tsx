import { Text } from '@chakra-ui/react'
import {
  type ScoreReasonCategoryDto,
  type ScoreReasonCategoryRequest,
  scoreReasonCategoryApi,
} from '../../api/scoreReasonCategoryApi'
import type { CrudConfig } from '../../components/crud/types'

type ScoreReasonCategoryForm = {
  name: string
  description: string
  order: string
}

export const scoreReasonCategoryCrudConfig: CrudConfig<
  ScoreReasonCategoryDto,
  ScoreReasonCategoryRequest,
  ScoreReasonCategoryForm
> = {
  queryKey: 'score-reason-categories',
  api: scoreReasonCategoryApi,
  title: 'Categorias de justificativa',
  description: 'Juntam as justificativas parecidas no relatório, tipo "tô sempre travado em Acessos".',
  entityLabel: 'categoria',
  columns: [
    { header: 'Ordem', width: '90px', render: (category) => <Text color="var(--migue-muted)">{category.order}</Text> },
    { header: 'Nome', render: (category) => <Text fontWeight="600">{category.name}</Text> },
    {
      header: 'Descrição',
      render: (category) => (
        <Text color="var(--migue-muted)" lineClamp={1}>
          {category.description || '—'}
        </Text>
      ),
    },
  ],
  fields: [
    {
      name: 'name',
      label: 'Nome',
      required: true,
      placeholder: 'Ex: Acessos',
      validate: (value) => (value.trim().length > 100 ? 'Nome grande demais, até 100 caracteres.' : undefined),
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
      placeholder: 'Que tipo de justificativa cai aqui',
      validate: (value) => (value.length > 500 ? 'Descrição grande demais, até 500 caracteres.' : undefined),
    },
    {
      name: 'order',
      label: 'Ordem',
      type: 'number',
      required: true,
      helperText: 'Quanto menor, mais pra cima aparece.',
      validate: (value) => (Number.isInteger(Number(value)) && Number(value) >= 0 ? undefined : 'Coloca um número inteiro, 0 ou maior.'),
    },
  ],
  emptyForm: { name: '', description: '', order: '0' },
  toForm: (category) => ({
    name: category.name,
    description: category.description ?? '',
    order: String(category.order),
  }),
  toRequest: (values) => ({
    name: values.name.trim(),
    description: values.description.trim() || null,
    order: Number(values.order),
  }),
  getItemLabel: (category) => category.name,
}
