import { Box, Button, Flex, Heading, HStack, IconButton, Text } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { ChevronDownIcon } from '../../components/icons'
import { formatWeekRange } from './weekStats'

interface DashboardHeaderProps {
  userName?: string
  weekStart: Date
  isCurrentWeek: boolean
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
}

export function DashboardHeader({ userName, weekStart, isCurrentWeek, onPrevious, onNext, onToday }: DashboardHeaderProps) {
  const firstName = userName?.split(' ')[0]

  return (
    <Flex justify="space-between" align="flex-start" mb="28px" wrap="wrap" gap="16px">
      <Box>
        <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="32px">
          {firstName ? `E aí, ${firstName}` : 'Dashboard'}
        </Heading>
        <Text color="var(--migue-muted)" mt="4px">
          Sua semana em números. Entregou ou deu migué?
        </Text>
      </Box>

      <Flex align="center" gap="12px" wrap="wrap">
        <HStack gap="4px" bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="12px" p="4px">
          <IconButton size="sm" variant="ghost" aria-label="Semana anterior" onClick={onPrevious}>
            <ChevronDownIcon style={{ transform: 'rotate(90deg)' }} />
          </IconButton>
          <Text fontWeight="700" fontSize="15px" color="var(--migue-ink)" minW="150px" textAlign="center">
            {isCurrentWeek ? 'Essa semana' : formatWeekRange(weekStart)}
          </Text>
          <IconButton size="sm" variant="ghost" aria-label="Próxima semana" onClick={onNext} disabled={isCurrentWeek}>
            <ChevronDownIcon style={{ transform: 'rotate(-90deg)' }} />
          </IconButton>
        </HStack>

        {!isCurrentWeek && (
          <Button size="sm" variant="outline" colorPalette="orange" color="var(--migue-ink)" onClick={onToday}>
            Voltar pra hoje
          </Button>
        )}

        <Button asChild colorPalette="orange">
          <Link to="/daily">Registrar o dia</Link>
        </Button>
      </Flex>
    </Flex>
  )
}
