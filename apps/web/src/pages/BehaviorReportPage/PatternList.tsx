import { Badge, Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import type { CompetencyReportPatternDto } from '../../api/competencyReportApi'

export function PatternList({ patterns }: { patterns: CompetencyReportPatternDto[] }) {
  if (patterns.length === 0) {
    return (
      <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="24px">
        <Text fontSize="16px" color="var(--migue-ink)">
          Nenhum padrão ruim se repetiu nas suas respostas.
        </Text>
      </Box>
    )
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px">
      {patterns.map((pattern) => (
        <Box key={pattern.signal} bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="18px">
          <Flex align="center" justify="space-between" gap="8px" mb="6px">
            <Text fontSize="17px" fontWeight="700" color="var(--migue-ink)">
              {pattern.label}
            </Text>
            <Flex gap="6px" align="center">
              {pattern.isPressureSignal && (
                <Badge colorPalette="orange" size="sm">
                  sinal de pressão
                </Badge>
              )}
              <Text fontSize="15px" fontWeight="700" color="var(--migue-ink)">
                {pattern.count}x
              </Text>
            </Flex>
          </Flex>
          <Text fontSize="15px" color="var(--migue-muted)">
            {pattern.meaning}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}
