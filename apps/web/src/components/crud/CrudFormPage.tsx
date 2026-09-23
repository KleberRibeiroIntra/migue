import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { ApiError } from '../../api/client'
import { createCrudHooks } from '../../hooks/useCrud'
import { useCrudForm } from '../../hooks/useCrudForm'
import { CrudFormFields } from './CrudForm'
import type { CrudConfig, FormMode, FormValues } from './types'

interface CrudFormPageProps<TItem extends { id: string }, TRequest, TForm extends FormValues> {
  config: CrudConfig<TItem, TRequest, TForm>
  /** Id do item em edição; sem id a página cria um novo. */
  id?: string
  /** Chamado ao salvar com sucesso ou cancelar (normalmente volta para a listagem). */
  onDone: () => void
}

/**
 * Página de criação/edição padrão. Reaproveita os `fields` do `CrudConfig`,
 * então o mesmo config serve para a listagem e para o formulário.
 */
export function CrudFormPage<TItem extends { id: string }, TRequest, TForm extends FormValues>({
  config,
  id,
  onDone,
}: CrudFormPageProps<TItem, TRequest, TForm>) {
  const { useById, useCreate, useUpdate } = useMemo(
    () => createCrudHooks(config.queryKey, config.api),
    [config.queryKey, config.api],
  )
  const mode: FormMode = id ? 'edit' : 'create'
  const { data: item, isLoading, error: loadError } = useById(id)
  const createMutation = useCreate()
  const updateMutation = useUpdate()
  const saveMutation = mode === 'edit' ? updateMutation : createMutation

  function handleSubmit(values: TForm) {
    const request = config.toRequest(values, mode)
    if (id) updateMutation.mutate({ id, request }, { onSuccess: onDone })
    else createMutation.mutate(request, { onSuccess: onDone })
  }

  const title = mode === 'edit' ? `Editar ${config.entityLabel}` : `Novo ${config.entityLabel}`

  return (
    <Box maxW="640px">
      <Button variant="ghost" size="sm" px="0" mb="12px" color="var(--migue-muted)" onClick={onDone}>
        ← Voltar para {config.title.toLowerCase()}
      </Button>

      <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="28px" mb="24px">
        {title}
      </Heading>

      <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="24px">
        {mode === 'edit' && isLoading && (
          <Text color="var(--migue-muted)" fontSize="14px">
            Carregando...
          </Text>
        )}

        {loadError && (
          <Text color="red.600" fontSize="14px">
            {loadError instanceof ApiError && loadError.status === 404
              ? `${config.entityLabel[0].toUpperCase()}${config.entityLabel.slice(1)} não encontrado.`
              : 'Não foi possível carregar os dados da API.'}
          </Text>
        )}

        {(mode === 'create' || item) && (
          <CrudFormBody
            key={item?.id ?? 'new'}
            config={config}
            mode={mode}
            initialValues={item ? config.toForm(item) : config.emptyForm}
            isSaving={saveMutation.isPending}
            submitError={saveMutation.error}
            onSubmit={handleSubmit}
            onCancel={onDone}
          />
        )}
      </Box>
    </Box>
  )
}

interface CrudFormBodyProps<TItem extends { id: string }, TRequest, TForm extends FormValues> {
  config: CrudConfig<TItem, TRequest, TForm>
  mode: FormMode
  initialValues: TForm
  isSaving: boolean
  submitError: Error | null
  onSubmit: (values: TForm) => void
  onCancel: () => void
}

function CrudFormBody<TItem extends { id: string }, TRequest, TForm extends FormValues>({
  config,
  mode,
  initialValues,
  isSaving,
  submitError,
  onSubmit,
  onCancel,
}: CrudFormBodyProps<TItem, TRequest, TForm>) {
  const form = useCrudForm({ fields: config.fields, mode, initialValues, submitError, onSubmit })

  return (
    <form onSubmit={form.handleSubmit} noValidate>
      <CrudFormFields form={form} />

      <Flex gap="12px" mt="24px" justify="flex-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
          Cancelar
        </Button>
        <Button type="submit" colorPalette="orange" fontWeight="700" loading={isSaving}>
          Salvar
        </Button>
      </Flex>
    </form>
  )
}
