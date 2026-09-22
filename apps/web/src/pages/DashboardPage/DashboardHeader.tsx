import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { requestNewReport } from '../../store/dashboardStore'

export function DashboardHeader() {
  return (
    <Flex justify="space-between" align="flex-start" mb="32px" wrap="wrap" gap="16px">
      <Box>
        <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="32px">
          Dashboard
        </Heading>
        <Text color="var(--migue-muted)" mt="4px">
          Confira se o time entregou ou deu migué essa semana.
        </Text>
      </Box>
      <Button colorPalette="orange" fontWeight="700" onClick={requestNewReport}>
        Novo relatório
      </Button>
    </Flex>
  )
}
