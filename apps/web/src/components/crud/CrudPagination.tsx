import { Button, HStack, Text } from '@chakra-ui/react'

interface CrudPaginationProps {
  /** Página atual, base 0 (igual ao backend). */
  pageNumber: number
  pageSize: number
  totalRows: number
  onPageChange: (pageNumber: number) => void
}

export function CrudPagination({ pageNumber, pageSize, totalRows, onPageChange }: CrudPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize))
  const first = totalRows === 0 ? 0 : pageNumber * pageSize + 1
  const last = Math.min(totalRows, (pageNumber + 1) * pageSize)

  return (
    <HStack justify="space-between" px="16px" py="12px" borderTop="1px solid" borderColor="blackAlpha.100">
      <Text fontSize="13px" color="var(--migue-muted)">
        {first}–{last} de {totalRows}
      </Text>
      <HStack gap="8px">
        <Button size="xs" variant="outline" disabled={pageNumber === 0} onClick={() => onPageChange(pageNumber - 1)}>
          Anterior
        </Button>
        <Text fontSize="13px" fontWeight="600" color="var(--migue-muted)">
          {pageNumber + 1} / {totalPages}
        </Text>
        <Button
          size="xs"
          variant="outline"
          disabled={pageNumber + 1 >= totalPages}
          onClick={() => onPageChange(pageNumber + 1)}
        >
          Próxima
        </Button>
      </HStack>
    </HStack>
  )
}
