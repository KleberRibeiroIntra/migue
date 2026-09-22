import { Avatar, Badge, Box, Heading, HStack, Table, Text } from '@chakra-ui/react'
import { activity } from '../../data/activity'

export function ActivityTable() {
  return (
    <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="8px" overflowX="auto">
      <Heading fontSize="18px" fontFamily="var(--font-display)" color="var(--migue-ink)" px="16px" pt="12px" pb="8px">
        Atividade recente
      </Heading>
      <Table.Root size="md">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Projeto</Table.ColumnHeader>
            <Table.ColumnHeader>Responsável</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Atualizado</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {activity.map((row) => (
            <Table.Row key={row.project}>
              <Table.Cell fontWeight="600">{row.project}</Table.Cell>
              <Table.Cell>
                <HStack gap="8px">
                  <Avatar.Root size="xs">
                    <Avatar.Fallback name={row.owner} />
                  </Avatar.Root>
                  <Text>{row.owner}</Text>
                </HStack>
              </Table.Cell>
              <Table.Cell>
                <Badge colorPalette={row.statusColor}>{row.status}</Badge>
              </Table.Cell>
              <Table.Cell color="var(--migue-muted)">{row.updated}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
