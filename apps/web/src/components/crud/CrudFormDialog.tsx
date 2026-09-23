import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import { useCrudForm } from '../../hooks/useCrudForm'
import { CrudFormFields } from './CrudForm'
import type { CrudField, FormMode, FormValues } from './types'

interface CrudFormDialogProps<TForm extends FormValues> {
  open: boolean
  mode: FormMode
  title: string
  fields: CrudField<TForm>[]
  initialValues: TForm
  isSaving: boolean
  submitError: Error | null
  onSubmit: (values: TForm) => void
  onClose: () => void
}

export function CrudFormDialog<TForm extends FormValues>({
  open,
  mode,
  title,
  fields,
  initialValues,
  isSaving,
  submitError,
  onSubmit,
  onClose,
}: CrudFormDialogProps<TForm>) {
  const form = useCrudForm({ fields, mode, initialValues, submitError, onSubmit })

  return (
    <Dialog.Root open={open} onOpenChange={(event) => !event.open && onClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="16px" asChild>
            <form onSubmit={form.handleSubmit} noValidate>
              <Dialog.Header>
                <Dialog.Title fontFamily="var(--font-display)" color="var(--migue-ink)">
                  {title}
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <CrudFormFields form={form} />
              </Dialog.Body>

              <Dialog.Footer>
                <Button type="button" variant="outline" onClick={onClose} disabled={isSaving}>
                  Cancelar
                </Button>
                <Button type="submit" colorPalette="orange" fontWeight="700" loading={isSaving}>
                  Salvar
                </Button>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
