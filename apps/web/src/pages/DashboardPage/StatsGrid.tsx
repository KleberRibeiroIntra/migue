import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { type WeekStats, formatHours } from './weekStats'

interface StatTile {
  label: string
  value: string
  /** Variação contra a semana anterior; null quando não dá pra comparar. */
  delta: number | null
  formatDelta: (delta: number) => string
  /** Subir é bom (horas, entregas) ou ruim (travas)? */
  upIsGood: boolean
  hint?: string
}

export function StatsGrid({ current, previous }: { current: WeekStats; previous: WeekStats }) {
  const hasPrevious = previous.activityCount > 0
  const missingDays = current.elapsedWorkdays - current.loggedWorkdays
  const count = (delta: number) => `${delta > 0 ? '+' : ''}${delta}`

  const hero: StatTile = {
    label: 'Horas registradas',
    value: formatHours(current.totalMinutes),
    delta: hasPrevious ? current.totalMinutes - previous.totalMinutes : null,
    formatDelta: (delta) => `${delta > 0 ? '+' : '−'}${formatHours(Math.abs(delta))}`,
    upIsGood: true,
    hint: `${current.activityCount} ${current.activityCount === 1 ? 'atividade' : 'atividades'} na semana`,
  }

  const tiles: StatTile[] = [
    {
      label: 'Entregas',
      value: String(current.completed),
      delta: hasPrevious ? current.completed - previous.completed : null,
      formatDelta: count,
      upIsGood: true,
    },
    {
      label: 'Travou',
      value: String(current.blocked),
      delta: hasPrevious ? current.blocked - previous.blocked : null,
      formatDelta: count,
      upIsGood: false,
    },
    {
      label: 'Nota média',
      value: current.averageScore === null ? '—' : `${current.averageScore.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} ★`,
      delta:
        current.averageScore !== null && previous.averageScore !== null
          ? Math.round((current.averageScore - previous.averageScore) * 10) / 10
          : null,
      formatDelta: (delta) => `${delta > 0 ? '+' : ''}${delta.toLocaleString('pt-BR')}`,
      upIsGood: true,
    },
    {
      label: 'Dias com registro',
      value: `${current.loggedWorkdays}/${current.elapsedWorkdays || 5}`,
      delta: null,
      formatDelta: count,
      upIsGood: true,
      hint:
        missingDays > 0
          ? `${missingDays} ${missingDays === 1 ? 'dia útil' : 'dias úteis'} sem nada. Migué?`
          : current.elapsedWorkdays > 0
            ? 'Nenhum dia em branco. Bonito!'
            : undefined,
    },
  ]

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 5 }} gap="16px" mb="20px">
      <Box gridColumn={{ md: 'span 2', xl: 'span 1' }}>
        <Tile tile={hero} isHero />
      </Box>
      {tiles.map((tile) => (
        <Tile key={tile.label} tile={tile} />
      ))}
    </SimpleGrid>
  )
}

function Tile({ tile, isHero = false }: { tile: StatTile; isHero?: boolean }) {
  const { delta } = tile
  const good = delta !== null && delta !== 0 && delta > 0 === tile.upIsGood

  return (
    <Box
      h="full"
      bg={isHero ? 'var(--migue-ink)' : 'white'}
      borderWidth="1px"
      borderColor="blackAlpha.100"
      borderRadius="16px"
      p="20px"
    >
      <Text fontSize="14px" fontWeight="600" color={isHero ? 'whiteAlpha.800' : 'var(--migue-muted)'}>
        {tile.label}
      </Text>
      <Text
        fontSize={isHero ? '48px' : '32px'}
        fontWeight="700"
        lineHeight="1.1"
        mt="4px"
        color={isHero ? 'white' : 'var(--migue-ink)'}
      >
        {tile.value}
      </Text>
      {delta !== null && (
        <Text fontSize="13px" fontWeight="700" mt="6px" color={delta === 0 ? (isHero ? 'whiteAlpha.700' : 'gray.500') : good ? (isHero ? 'green.300' : 'green.600') : isHero ? 'red.300' : 'red.600'}>
          {delta === 0 ? 'igual à semana passada' : `${delta > 0 ? '▲' : '▼'} ${tile.formatDelta(delta)} vs semana passada`}
        </Text>
      )}
      {tile.hint && (
        <Text fontSize="13px" mt="6px" color={isHero ? 'whiteAlpha.700' : 'var(--migue-muted)'}>
          {tile.hint}
        </Text>
      )}
    </Box>
  )
}
