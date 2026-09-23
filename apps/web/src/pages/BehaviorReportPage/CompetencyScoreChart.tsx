import { Box, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import type { CompetencyReportScoreDto } from '../../api/competencyReportApi'
import { scorePalette } from './scoreColors'

const LEGEND = [
  { label: 'Manda bem (80+)', palette: 'green' },
  { label: 'Ok (60–79)', palette: 'yellow' },
  { label: 'Precisa melhorar (40–59)', palette: 'orange' },
  { label: 'Crítico (<40)', palette: 'red' },
]

/** Ranking horizontal das competências, da pior para a melhor. */
export function CompetencyScoreChart({ competencies }: { competencies: CompetencyReportScoreDto[] }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const sorted = [...competencies].sort((a, b) => a.score - b.score || a.order - b.order)

  return (
    <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="24px">
      <Flex gap="16px" wrap="wrap" mb="18px">
        {LEGEND.map((item) => (
          <Flex key={item.label} align="center" gap="6px">
            <Box w="10px" h="10px" borderRadius="3px" bg={`${item.palette}.500`} />
            <Text fontSize="13px" color="var(--migue-muted)">
              {item.label}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Flex as="ol" direction="column" gap="2px" role="list" aria-label="Nota por competência, da pior para a melhor">
        {sorted.map((competency) => {
          const isHovered = hovered === competency.competencyId

          return (
            <Flex
              as="li"
              key={competency.competencyId}
              align="center"
              gap="12px"
              py="6px"
              px="8px"
              borderRadius="8px"
              bg={isHovered ? 'blackAlpha.50' : 'transparent'}
              onMouseEnter={() => setHovered(competency.competencyId)}
              onMouseLeave={() => setHovered(null)}
              title={`${competency.name}: ${competency.score}/100 · ${competency.level}`}
            >
              <Text fontSize="15px" color="var(--migue-ink)" w={{ base: '130px', md: '200px' }} flexShrink={0} lineClamp={1}>
                {competency.name}
              </Text>
              <Box flex="1" h="12px" bg="blackAlpha.50" borderRadius="4px" overflow="hidden">
                <Box
                  h="100%"
                  w={`${Math.max(competency.score, 2)}%`}
                  bg={`${scorePalette(competency.score)}.500`}
                  borderRadius="0 4px 4px 0"
                />
              </Box>
              <Text fontSize="15px" fontWeight="700" color="var(--migue-ink)" w="36px" textAlign="right" flexShrink={0}>
                {competency.score}
              </Text>
              <Text
                fontSize="13px"
                color="var(--migue-muted)"
                w="110px"
                flexShrink={0}
                display={{ base: 'none', md: 'block' }}
              >
                {competency.level}
              </Text>
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
}
