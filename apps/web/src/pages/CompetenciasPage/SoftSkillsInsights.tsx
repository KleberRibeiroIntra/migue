import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import type { SoftSkillReportItemDto } from '../../api/softSkillAnswerApi'
import { useMySoftSkillReport } from '../../hooks/useSoftSkillAnswers'

type Tone = 'strength' | 'neutral' | 'weakness'

const TONES: Record<Tone, { palette: string; title: string; subtitle: string; tipsTitle: string }> = {
  weakness: {
    palette: 'red',
    title: 'Onde você dá migué',
    subtitle: 'Nota 1 ou 2. Você mesmo admitiu — agora é ter um plano.',
    tipsTitle: 'O que fazer a partir de amanhã',
  },
  neutral: {
    palette: 'yellow',
    title: 'No morno',
    subtitle: 'Nota 3. Atende, mas não é o que te faz ser lembrado.',
    tipsTitle: 'O que falta pra subir de nível',
  },
  strength: {
    palette: 'green',
    title: 'Onde você manda bem',
    subtitle: 'Nota 4 ou 5. Não é pra relaxar — é pra usar a seu favor.',
    tipsTitle: 'Como usar isso a seu favor',
  },
}

/** Análise abaixo do gráfico de estrelas: pontos fracos primeiro, sem rodeio. */
export function SoftSkillsInsights() {
  const { data: report, isLoading, isError } = useMySoftSkillReport()

  if (isLoading) {
    return (
      <Text color="var(--migue-muted)" fontSize="16px">
        Carregando análise...
      </Text>
    )
  }

  if (isError) {
    return (
      <Text color="red.600" fontSize="16px">
        Não foi possível carregar a análise das soft skills.
      </Text>
    )
  }

  // sem autoavaliação o SoftSkillsReport já mostra o convite pra responder
  if (!report) return null

  return (
    <Flex direction="column" gap="28px">
      <Box bg="var(--migue-ink)" color="white" borderRadius="16px" p="24px">
        <Flex align="center" gap="20px" wrap="wrap">
          <Box>
            <Text fontFamily="var(--font-display)" fontSize="48px" fontWeight="700" lineHeight="1">
              {report.average.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}
            </Text>
            <Text fontSize="13px" opacity={0.75}>
              média / 5
            </Text>
          </Box>
          <Box flex="1" minW="220px">
            <Heading fontFamily="var(--font-display)" fontSize="24px" mb="4px">
              {report.verdict}
            </Heading>
            <Text fontSize="16px" opacity={0.85}>
              {report.verdictDetail}
            </Text>
          </Box>
        </Flex>
        {report.previousAnsweredAt && (
          <Text fontSize="13px" opacity={0.6} mt="14px">
            Comparando com a autoavaliação de {new Date(report.previousAnsweredAt).toLocaleDateString('pt-BR')}
          </Text>
        )}
      </Box>

      {report.warnings.map((warning) => (
        <Box key={warning} bg="orange.50" borderWidth="1px" borderColor="orange.200" borderRadius="12px" p="14px">
          <Text fontSize="16px" fontWeight="600" color="orange.800">
            {warning}
          </Text>
        </Box>
      ))}

      <InsightGroup tone="weakness" items={report.weaknesses} />
      <InsightGroup tone="neutral" items={report.neutral} />
      <InsightGroup tone="strength" items={report.strengths} />
    </Flex>
  )
}

function InsightGroup({ tone, items }: { tone: Tone; items: SoftSkillReportItemDto[] }) {
  if (items.length === 0) return null
  const config = TONES[tone]

  return (
    <Box as="section">
      <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="22px">
        {config.title}
      </Heading>
      <Text fontSize="15px" color="var(--migue-muted)" mt="2px" mb="14px">
        {config.subtitle}
      </Text>

      <SimpleGrid columns={{ base: 1, lg: tone === 'strength' ? 2 : 1 }} gap="14px">
        {items.map((item) => (
          <Box
            key={item.softSkillId}
            bg="white"
            borderWidth="1px"
            borderColor="blackAlpha.100"
            borderLeftWidth="4px"
            borderLeftColor={`${config.palette}.500`}
            borderRadius="16px"
            p="20px"
          >
            <Flex align="center" gap="10px" wrap="wrap" mb="8px">
              <Text fontSize="18px" fontWeight="700" color="var(--migue-ink)">
                {item.name}
              </Text>
              <Badge colorPalette={config.palette}>
                {item.value}/5 · {item.label}
              </Badge>
              <Trend value={item.value} previous={item.previousValue} />
            </Flex>

            <Text fontSize="16px" color="var(--migue-ink)" mb="12px">
              {item.summary}
            </Text>

            {item.behaviorGap && (
              <Box bg="var(--migue-cream)" borderRadius="10px" p="12px" mb="12px">
                <Text fontSize="15px" color="var(--migue-ink)">
                  <Text as="span" fontWeight="700">
                    Autoimagem × comportamento:
                  </Text>{' '}
                  {item.behaviorGap}
                </Text>
              </Box>
            )}

            <Text fontSize="15px" fontWeight="700" color="var(--migue-ink)" mb="6px">
              {config.tipsTitle}
            </Text>
            <Flex as="ul" direction="column" gap="6px" pl="20px">
              {item.tips.map((tip) => (
                <Text as="li" key={tip} fontSize="15px" color="var(--migue-ink)">
                  {tip}
                </Text>
              ))}
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

/** Evolução em relação à autoavaliação anterior; o texto acompanha a cor. */
function Trend({ value, previous }: { value: number; previous: number | null }) {
  if (previous === null) return null
  const delta = value - previous

  if (delta === 0) {
    return (
      <Text fontSize="13px" color="var(--migue-muted)">
        igual à última vez
      </Text>
    )
  }

  return (
    <Text fontSize="13px" fontWeight="700" color={delta > 0 ? 'green.700' : 'red.700'}>
      {delta > 0 ? '▲ subiu' : '▼ caiu'} {Math.abs(delta)} desde a última ({previous}/5)
    </Text>
  )
}
