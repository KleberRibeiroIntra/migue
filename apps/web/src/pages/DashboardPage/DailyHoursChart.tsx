import { Box, Flex, Portal, Text, Tooltip } from '@chakra-ui/react'
import { Panel } from './Panel'
import { type DayBucket, formatHours } from './weekStats'

const CHART_HEIGHT = 180
/** Altura útil das barras: sobra espaço em cima pro rótulo do valor da maior barra. */
const PLOT_HEIGHT = CHART_HEIGHT - 24
/** Jornada de referência: a escala nunca fica menor que isso, pra 1h não parecer um dia cheio. */
const WORKDAY_MINUTES = 8 * 60

export function DailyHoursChart({ days }: { days: DayBucket[] }) {
  // fim de semana só aparece se teve registro
  const visible = days.filter((day) => !day.isWeekend || day.count > 0)
  const max = Math.max(WORKDAY_MINUTES, ...visible.map((day) => day.minutes))
  const workdayY = CHART_HEIGHT - (WORKDAY_MINUTES / max) * PLOT_HEIGHT

  return (
    <Panel title="Horas por dia" subtitle="Dia sem barra é dia sem registro.">
      <Box position="relative" h={`${CHART_HEIGHT + 28}px`} pl="28px">
        {/* linha de referência da jornada de 8h */}
        <Box position="absolute" left="28px" right="0" top={`${workdayY}px`} borderTop="1px solid" borderColor="blackAlpha.100" />
        <Text position="absolute" left="0" top={`${workdayY - 8}px`} fontSize="12px" color="var(--migue-muted)">
          8h
        </Text>
        {/* linha de base */}
        <Box position="absolute" left="28px" right="0" top={`${CHART_HEIGHT}px`} borderTop="1px solid" borderColor="blackAlpha.200" />

        <Flex h="full" justify="space-around" align="flex-start">
          {visible.map((day) => (
            <DayColumn key={day.key} day={day} max={max} />
          ))}
        </Flex>
      </Box>
    </Panel>
  )
}

function DayColumn({ day, max }: { day: DayBucket; max: number }) {
  const height = day.minutes > 0 ? Math.max(4, (day.minutes / max) * PLOT_HEIGHT) : 0
  const date = day.date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  const summary = day.isFuture
    ? 'Ainda não chegou'
    : day.count === 0
      ? 'Nada registrado'
      : `${formatHours(day.minutes)} · ${day.count} ${day.count === 1 ? 'atividade' : 'atividades'}`

  return (
    <Tooltip.Root openDelay={80} closeDelay={0} positioning={{ placement: 'top' }}>
      <Tooltip.Trigger asChild>
        <Flex
          direction="column"
          align="center"
          h="full"
          flex="1"
          maxW="72px"
          tabIndex={0}
          cursor="default"
          borderRadius="8px"
          aria-label={`${day.label} ${date}: ${summary}`}
          _hover={{ bg: 'orange.50' }}
          _focusVisible={{ outline: '2px solid', outlineColor: 'orange.300' }}
        >
          <Flex direction="column" justify="flex-end" align="center" h={`${CHART_HEIGHT}px`} w="full">
            {day.minutes > 0 ? (
              <Text fontSize="12px" fontWeight="700" color="var(--migue-ink)" mb="4px">
                {formatHours(day.minutes)}
              </Text>
            ) : (
              !day.isFuture && (
                <Text fontSize="12px" color="var(--migue-muted)" mb="4px">
                  {day.count > 0 ? 'sem horas' : '—'}
                </Text>
              )
            )}
            <Box w="24px" h={`${height}px`} bg="var(--migue-accent)" borderTopRadius="4px" />
          </Flex>
          <Text fontSize="13px" fontWeight="600" mt="8px" color={day.isFuture ? 'blackAlpha.400' : 'var(--migue-muted)'}>
            {day.label}
          </Text>
        </Flex>
      </Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Text fontWeight="700">{summary}</Text>
            <Text fontSize="12px" opacity={0.8}>
              {day.label}, {date}
            </Text>
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  )
}
