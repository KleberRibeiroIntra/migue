import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import type { CompetencyReportMoodDto, CompetencyReportPaceDto } from '../../api/competencyReportApi'
import { moodPalette } from './scoreColors'

const MOOD_LEVELS = ['Tranquilo', 'Tenso', 'Estressado', 'No limite']

function formatDateTime(value: string) {
  return new Date(value).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}

interface MoodCardProps {
  mood: CompetencyReportMoodDto
  pace: CompetencyReportPaceDto
}

export function MoodCard({ mood, pace }: MoodCardProps) {
  const palette = moodPalette(mood.level)

  return (
    <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="24px">
      <Text fontSize="13px" fontWeight="700" letterSpacing="0.06em" textTransform="uppercase" color="var(--migue-muted)">
        Como você estava no dia
      </Text>
      <Flex align="center" gap="10px" mt="6px" mb="8px" wrap="wrap">
        <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="24px">
          {mood.headline}
        </Heading>
        <Badge colorPalette={palette} size="lg">
          {mood.label}
        </Badge>
      </Flex>
      <Text fontSize="16px" color="var(--migue-muted)" mb="18px">
        {mood.detail}
      </Text>

      {/* Termômetro: 4 faixas com o nível atual destacado; o texto do nível vai junto para não depender só da cor */}
      <Flex gap="2px" mb="6px" role="img" aria-label={`Índice de pressão ${mood.score} de 100: ${mood.label}`}>
        {MOOD_LEVELS.map((label, index) => (
          <Box
            key={label}
            flex="1"
            h="10px"
            borderRadius="4px"
            bg={index <= mood.level ? `${moodPalette(index)}.500` : 'blackAlpha.100'}
            title={label}
          />
        ))}
      </Flex>
      <Flex justify="space-between" mb="20px">
        {MOOD_LEVELS.map((label, index) => (
          <Text
            key={label}
            fontSize="13px"
            fontWeight={index === mood.level ? '700' : '500'}
            color={index === mood.level ? 'var(--migue-ink)' : 'var(--migue-muted)'}
          >
            {label}
          </Text>
        ))}
      </Flex>

      <Text fontSize="15px" fontWeight="700" color="var(--migue-ink)" mb="8px">
        De onde tiramos isso
      </Text>
      <Flex as="ul" direction="column" gap="8px" pl="20px" mb="20px">
        {mood.evidence.map((item) => (
          <Text as="li" key={item} fontSize="15px" color="var(--migue-ink)">
            {item}
          </Text>
        ))}
      </Flex>

      <SimpleGrid columns={{ base: 2, md: 4 }} gap="12px">
        <PaceStat label="Tempo respondendo" value={pace.answeredInRound > 1 ? `${pace.activeMinutes} min` : '—'} />
        <PaceStat
          label="Por pergunta (mediana)"
          value={pace.medianSecondsPerAnswer !== null ? `${pace.medianSecondsPerAnswer}s` : '—'}
        />
        <PaceStat label="Respostas no automático" value={String(pace.fastAnswers)} />
        <PaceStat label="Mudanças de ideia" value={String(pace.totalChanges)} />
      </SimpleGrid>

      {pace.startedAt && pace.finishedAt && (
        <Text fontSize="13px" color="var(--migue-muted)" mt="12px">
          Preenchido de {formatDateTime(pace.startedAt)} a {formatDateTime(pace.finishedAt)}
          {pace.pauses > 0 && ` · ${pace.pauses} pausa(s) de mais de 10 min`}
        </Text>
      )}
    </Box>
  )
}

function PaceStat({ label, value }: { label: string; value: string }) {
  return (
    <Box bg="var(--migue-cream)" borderRadius="12px" p="12px">
      <Text fontSize="22px" fontWeight="700" fontFamily="var(--font-display)" color="var(--migue-ink)">
        {value}
      </Text>
      <Text fontSize="13px" color="var(--migue-muted)">
        {label}
      </Text>
    </Box>
  )
}
