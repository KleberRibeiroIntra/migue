import { Box, SimpleGrid, Stat } from '@chakra-ui/react'
import { useStore } from '@tanstack/react-store'
import { dashboardStore } from '../../store/dashboardStore'

export function StatsGrid() {
  const { deliveredOnTime, gaveMigue, pendingReports, activeProjects } = useStore(dashboardStore)

  const stats = [
    { label: 'Entregas no prazo', value: String(deliveredOnTime), color: '#2f9e44' },
    { label: 'Deu migué', value: String(gaveMigue), color: 'var(--migue-accent)' },
    { label: 'Relatórios pendentes', value: String(pendingReports), color: 'var(--migue-ink)' },
    { label: 'Projetos ativos', value: String(activeProjects), color: 'var(--migue-ink)' },
  ]

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="20px" mb="32px">
      {stats.map((s) => (
        <Box key={s.label} bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="20px">
          <Stat.Root>
            <Stat.Label color="var(--migue-muted)">{s.label}</Stat.Label>
            <Stat.ValueText fontFamily="var(--font-display)" fontSize="32px" color={s.color}>
              {s.value}
            </Stat.ValueText>
          </Stat.Root>
        </Box>
      ))}
    </SimpleGrid>
  )
}
