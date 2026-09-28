import { Box, Button, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { useMemo, useState } from 'react'
import { useMyActivities } from '../../hooks/useMyActivities'
import { authStore } from '../../store/authStore'
import { ActivityTable } from './ActivityTable'
import { BarList } from './BarList'
import { DailyHoursChart } from './DailyHoursChart'
import { DashboardHeader } from './DashboardHeader'
import { Panel } from './Panel'
import { StatsGrid } from './StatsGrid'
import { addDays, computeWeekStats, formatHours, splitByWeek, startOfWeek } from './weekStats'

export function DashboardPage() {
  const user = useStore(authStore, (state) => state.user)
  const thisWeek = useMemo(() => startOfWeek(new Date()), [])
  const [weekStart, setWeekStart] = useState(thisWeek)
  const isCurrentWeek = weekStart.getTime() === thisWeek.getTime()

  // busca a semana escolhida e a anterior de uma vez: a anterior só serve pra variação dos números
  const query = useMyActivities(addDays(weekStart, -7), addDays(weekStart, 7))

  const stats = useMemo(() => {
    if (!query.data) return null
    const { current, previous } = splitByWeek(query.data, weekStart)
    return {
      activities: current,
      current: computeWeekStats(current, weekStart),
      previous: computeWeekStats(previous, addDays(weekStart, -7)),
    }
  }, [query.data, weekStart])

  return (
    <Box maxW="1200px">
      <DashboardHeader
        userName={user?.name}
        weekStart={weekStart}
        isCurrentWeek={isCurrentWeek}
        onPrevious={() => setWeekStart((start) => addDays(start, -7))}
        onNext={() => setWeekStart((start) => addDays(start, 7))}
        onToday={() => setWeekStart(thisWeek)}
      />

      {query.isLoading && <Text color="var(--migue-muted)">Carregando sua semana...</Text>}

      {query.isError && <Text color="red.600">Não rolou carregar suas atividades. Dá um F5 aí.</Text>}

      {stats && stats.activities.length === 0 && <EmptyWeek isCurrentWeek={isCurrentWeek} />}

      {stats && stats.activities.length > 0 && (
        <>
          <StatsGrid current={stats.current} previous={stats.previous} />

          <SimpleGrid columns={{ base: 1, lg: 3 }} gap="16px" mb="16px">
            <Box gridColumn={{ lg: 'span 2' }}>
              <DailyHoursChart days={stats.current.days} />
            </Box>
            <Panel title="Horas por projeto" subtitle="Atividade em mais de um projeto divide as horas.">
              <BarList
                items={stats.current.byProject}
                formatValue={formatHours}
                emptyMessage="Nenhuma hora registrada ainda."
              />
            </Panel>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap="16px" mb="16px">
            <Panel title="Onde você travou" subtitle="Justificativas das notas baixas, por categoria.">
              <BarList
                items={stats.current.blockers}
                formatValue={(count) => `${count}×`}
                emptyMessage="Nada travou essa semana (ou você não contou)."
              />
            </Panel>
            <Panel title="O que ajudou" subtitle="Justificativas das notas altas, por categoria.">
              <BarList
                items={stats.current.helpers}
                formatValue={(count) => `${count}×`}
                emptyMessage="Nenhuma nota alta justificada ainda."
              />
            </Panel>
          </SimpleGrid>

          <ActivityTable activities={stats.activities} />
        </>
      )}
    </Box>
  )
}

function EmptyWeek({ isCurrentWeek }: { isCurrentWeek: boolean }) {
  return (
    <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="40px" textAlign="center">
      <Heading fontFamily="var(--font-display)" fontSize="24px" color="var(--migue-ink)">
        {isCurrentWeek ? 'Semana em branco até agora' : 'Nada registrado nessa semana'}
      </Heading>
      <Text color="var(--migue-muted)" mt="8px" mb="20px">
        {isCurrentWeek
          ? 'Sem registro, não tem como provar que não deu migué. Bora anotar o que você fez hoje?'
          : 'Se você trabalhou e não anotou, ninguém vai saber. Dá pra registrar com a data de antes.'}
      </Text>
      <Button asChild colorPalette="orange">
        <Link to="/daily">Registrar o dia</Link>
      </Button>
    </Box>
  )
}
