import { Badge, Box, Flex, Heading, IconButton, Table, Text } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import type { ActivityDto } from '../../api/activityApi'
import { EditIcon } from '../../components/icons'
import { ACTIVITY_STATUS } from '../../data/activityStatus'
import { activityDay, formatHours } from './weekStats'

function formatDay(activity: ActivityDto) {
  const [year, month, day] = activityDay(activity).split('-').map(Number)
  return new Date(year, month - 1, day)
    .toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })
    .replace('.', '')
}

export function ActivityTable({ activities }: { activities: ActivityDto[] }) {
  return (
    <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="8px" overflowX="auto">
      <Heading fontSize="18px" fontFamily="var(--font-display)" color="var(--migue-ink)" px="16px" pt="12px" pb="8px">
        O que rolou na semana
      </Heading>
      <Table.Root size="md">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Dia</Table.ColumnHeader>
            <Table.ColumnHeader>O que fez</Table.ColumnHeader>
            <Table.ColumnHeader>Projetos</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Nota</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Horas</Table.ColumnHeader>
            <Table.ColumnHeader w="56px" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {activities.map((activity) => {
            const status = ACTIVITY_STATUS[activity.status]

            return (
              <Table.Row key={activity.id}>
                <Table.Cell color="var(--migue-muted)" whiteSpace="nowrap">
                  {formatDay(activity)}
                </Table.Cell>
                <Table.Cell>
                  <Text fontWeight="600" color="var(--migue-ink)">
                    {activity.title}
                  </Text>
                  {activity.scoreReasons.length > 0 && (
                    <Text fontSize="13px" color="var(--migue-muted)" lineClamp={1}>
                      {activity.scoreReasons.map((reason) => reason.description).join(' · ')}
                    </Text>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Flex gap="4px" wrap="wrap">
                    {activity.projects.length === 0 ? (
                      <Text color="var(--migue-muted)">—</Text>
                    ) : (
                      activity.projects.map((project) => (
                        <Badge key={project.id} variant="outline" colorPalette="gray">
                          {project.name}
                        </Badge>
                      ))
                    )}
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  <Badge colorPalette={status.color}>{status.label}</Badge>
                </Table.Cell>
                <Table.Cell whiteSpace="nowrap" color={activity.selfScore ? 'var(--migue-ink)' : 'var(--migue-muted)'}>
                  {activity.selfScore ? `${activity.selfScore} ★` : '—'}
                </Table.Cell>
                <Table.Cell textAlign="end" fontVariantNumeric="tabular-nums" whiteSpace="nowrap">
                  {activity.durationMinutes ? formatHours(activity.durationMinutes) : '—'}
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <IconButton asChild size="sm" variant="ghost" aria-label={`Editar "${activity.title}"`}>
                    <Link to="/daily/$id" params={{ id: activity.id }}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
