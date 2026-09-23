import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { createCrudHooks } from '../../hooks/useCrud'
import { ConfirmDialog } from './ConfirmDialog'
import { CrudFormDialog } from './CrudFormDialog'
import { CrudPagination } from './CrudPagination'
import { CrudTable } from './CrudTable'
import type { CrudConfig, FormMode, FormValues } from './types'

type FormState<TItem> = { mode: FormMode; item?: TItem; key: number } | null

/**
 * Página de CRUD padrão (listagem paginada + criar/editar em dialog + excluir com confirmação).
 * Um novo CRUD só precisa declarar um `CrudConfig` e renderizar `<CrudPage config={...} />`.
 */
export function CrudPage<TItem extends { id: string }, TRequest, TForm extends FormValues>({
  config,
  onCreate,
  onEdit,
}: {
  config: CrudConfig<TItem, TRequest, TForm>
  /** Quando informados, "Novo"/"Editar" chamam estes callbacks (ex: navegar para um CrudFormPage) em vez de abrir o dialog. */
  onCreate?: () => void
  onEdit?: (item: TItem) => void
}) {
  const { usePaged, useCreate, useUpdate, useRemove } = useMemo(
    () => createCrudHooks(config.queryKey, config.api),
    [config.queryKey, config.api],
  )
  const pageSize = config.pageSize ?? 10

  const [pageNumber, setPageNumber] = useState(0)
  const [formState, setFormState] = useState<FormState<TItem>>(null)
  const [itemToDelete, setItemToDelete] = useState<TItem | null>(null)

  const { data, isLoading, isError } = usePaged({ pageNumber, pageSize })
  const createMutation = useCreate()
  const updateMutation = useUpdate()
  const removeMutation = useRemove()
  const saveMutation = formState?.mode === 'edit' ? updateMutation : createMutation

  function openForm(mode: FormMode, item?: TItem) {
    if (mode === 'create' && onCreate) return onCreate()
    if (mode === 'edit' && item && onEdit) return onEdit(item)

    createMutation.reset()
    updateMutation.reset()
    setFormState({ mode, item, key: Date.now() })
  }

  function handleSubmit(values: TForm) {
    if (!formState) return
    const request = config.toRequest(values, formState.mode)
    const onSuccess = () => setFormState(null)

    if (formState.mode === 'edit' && formState.item) {
      updateMutation.mutate({ id: formState.item.id, request }, { onSuccess })
    } else {
      createMutation.mutate(request, { onSuccess })
    }
  }

  function openDelete(item: TItem) {
    removeMutation.reset()
    setItemToDelete(item)
  }

  function handleDelete() {
    if (!itemToDelete) return
    removeMutation.mutate(itemToDelete.id, {
      onSuccess: () => {
        setItemToDelete(null)
        // volta uma página se o item excluído era o último da página atual
        if (data && data.result.length === 1 && pageNumber > 0) setPageNumber(pageNumber - 1)
      },
    })
  }

  return (
    <Box>
      <Flex align="flex-end" justify="space-between" gap="16px" mb="24px" wrap="wrap">
        <Box>
          <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="28px">
            {config.title}
          </Heading>
          {config.description && <Text color="var(--migue-muted)">{config.description}</Text>}
        </Box>
        <Button colorPalette="orange" fontWeight="700" onClick={() => openForm('create')}>
          Novo {config.entityLabel}
        </Button>
      </Flex>

      <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="8px" overflowX="auto">
        {isLoading && (
          <Text color="var(--migue-muted)" fontSize="14px" p="16px">
            Carregando...
          </Text>
        )}

        {isError && (
          <Text color="red.600" fontSize="14px" p="16px">
            Não foi possível carregar os dados da API.
          </Text>
        )}

        {data && (
          <>
            <CrudTable
              columns={config.columns}
              items={data.result}
              emptyMessage={`Nenhum ${config.entityLabel} cadastrado.`}
              onEdit={(item) => openForm('edit', item)}
              onDelete={openDelete}
            />
            <CrudPagination
              pageNumber={pageNumber}
              pageSize={pageSize}
              totalRows={data.totalRows}
              onPageChange={setPageNumber}
            />
          </>
        )}
      </Box>

      {formState && (
        <CrudFormDialog
          key={formState.key}
          open
          mode={formState.mode}
          title={formState.mode === 'edit' ? `Editar ${config.entityLabel}` : `Novo ${config.entityLabel}`}
          fields={config.fields}
          initialValues={formState.item ? config.toForm(formState.item) : config.emptyForm}
          isSaving={saveMutation.isPending}
          submitError={saveMutation.error}
          onSubmit={handleSubmit}
          onClose={() => setFormState(null)}
        />
      )}

      <ConfirmDialog
        open={!!itemToDelete}
        title={`Excluir ${config.entityLabel}`}
        message={
          <>
            Tem certeza que deseja excluir <strong>{itemToDelete && config.getItemLabel(itemToDelete)}</strong>? Essa
            ação não pode ser desfeita.
          </>
        }
        confirmLabel="Excluir"
        isLoading={removeMutation.isPending}
        error={removeMutation.error?.message}
        onConfirm={handleDelete}
        onClose={() => setItemToDelete(null)}
      />
    </Box>
  )
}
