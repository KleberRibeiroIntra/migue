import { HStack, IconButton, Table, Text } from '@chakra-ui/react'
import { EditIcon, TrashIcon } from '../icons'
import type { CrudColumn } from './types'

interface CrudTableProps<TItem extends { id: string }> {
  columns: CrudColumn<TItem>[]
  items: TItem[]
  emptyMessage: string
  onEdit: (item: TItem) => void
  onDelete: (item: TItem) => void
}

export function CrudTable<TItem extends { id: string }>({
  columns,
  items,
  emptyMessage,
  onEdit,
  onDelete,
}: CrudTableProps<TItem>) {
  return (
    <Table.Root size="md">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeader key={column.header} w={column.width}>
              {column.header}
            </Table.ColumnHeader>
          ))}
          <Table.ColumnHeader textAlign="end" w="100px">
            Ações
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={columns.length + 1}>
              <Text color="var(--migue-muted)" textAlign="center" py="24px">
                {emptyMessage}
              </Text>
            </Table.Cell>
          </Table.Row>
        )}
        {items.map((item) => (
          <Table.Row key={item.id}>
            {columns.map((column) => (
              <Table.Cell key={column.header}>{column.render(item)}</Table.Cell>
            ))}
            <Table.Cell>
              <HStack gap="4px" justify="flex-end">
                <IconButton
                  size="sm"
                  variant="ghost"
                  color="var(--migue-muted)"
                  aria-label="Editar"
                  title="Editar"
                  onClick={() => onEdit(item)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="sm"
                  variant="ghost"
                  colorPalette="red"
                  aria-label="Excluir"
                  title="Excluir"
                  onClick={() => onDelete(item)}
                >
                  <TrashIcon />
                </IconButton>
              </HStack>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
