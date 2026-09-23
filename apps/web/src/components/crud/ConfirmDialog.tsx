import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: ReactNode
  confirmLabel?: string
  isLoading?: boolean
  error?: string
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  isLoading,
  error,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(event) => !event.open && onClose()} placement="center" role="alertdialog">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="16px">
            <Dialog.Header>
              <Dialog.Title fontFamily="var(--font-display)" color="var(--migue-ink)">
                {title}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text color="var(--migue-muted)">{message}</Text>
              {error && (
                <Text color="red.600" fontSize="14px" mt="12px">
                  {error}
                </Text>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button colorPalette="red" onClick={onConfirm} loading={isLoading}>
                {confirmLabel}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
