import { Badge, Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { getMyCompetencyReport } from '../../api/competencyReportApi'
import { CompetencyScoreChart } from './CompetencyScoreChart'
import { ImprovementList } from './ImprovementList'
import { MoodCard } from './MoodCard'
import { PatternList } from './PatternList'
import { scorePalette } from './scoreColors'

export function BehaviorReportPage() {
  const { data: report, isLoading, isError } = useQuery({
    queryKey: ['competency-assessment', 'me', 'report'],
    queryFn: getMyCompetencyReport,
  })

  return (
    <Box maxW="860px">
      <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="32px">
        Onde eu dou migué
      </Heading>
      <Text color="var(--migue-muted)" fontSize="17px" mt="4px" mb="28px">
        O relatório do seu mapa de competências. Sem rodeio: o que você faz bem, onde escorrega e o que mudar.
      </Text>

      {isLoading && (
        <Text color="var(--migue-muted)" fontSize="16px">
          Carregando...
        </Text>
      )}

      {isError && (
        <Text color="red.600" fontSize="16px">
          Não foi possível carregar o relatório da API.
        </Text>
      )}

      {report === null && (
        <Box bg="orange.50" borderRadius="16px" p="24px">
          <Text fontSize="17px" color="var(--migue-ink)" mb="14px">
            Você ainda não enviou o questionário. Sem resposta, sem relatório — e sem desculpa.
          </Text>
          <Button asChild colorPalette="orange" fontWeight="700">
            <Link to="/dashboard/behavior">Responder o questionário</Link>
          </Button>
        </Box>
      )}

      {report && (
        <Flex direction="column" gap="36px">
          <Box bg="var(--migue-ink)" color="white" borderRadius="20px" p={{ base: '24px', md: '32px' }}>
            <Flex align="center" gap={{ base: '16px', md: '28px' }} wrap="wrap">
              <Box>
                <Text fontFamily="var(--font-display)" fontSize="64px" fontWeight="700" lineHeight="1">
                  {report.overallScore}
                </Text>
                <Text fontSize="14px" opacity={0.75}>
                  nota geral / 100
                </Text>
              </Box>
              <Box flex="1" minW="240px">
                <Heading fontFamily="var(--font-display)" fontSize="28px" mb="6px">
                  {report.verdict}
                </Heading>
                <Text fontSize="16px" opacity={0.85}>
                  {report.verdictDetail}
                </Text>
              </Box>
            </Flex>
            <Text fontSize="13px" opacity={0.6} mt="16px">
              Questionário enviado em {new Date(report.submittedAt).toLocaleDateString('pt-BR')} ·{' '}
              {report.totalQuestions} perguntas
            </Text>
          </Box>

          <MoodCard mood={report.mood} pace={report.pace} />

          <Section
            title="Sem rodeios: o que você precisa melhorar"
            subtitle="As competências com nota mais baixa, da pior pra melhor, com as respostas que puxaram a nota pra baixo."
          >
            <ImprovementList improvements={report.improvements} />
          </Section>

          <Section title="Padrões que se repetiram" subtitle="O mesmo reflexo aparecendo em situações diferentes.">
            <PatternList patterns={report.patterns} />
          </Section>

          <Section title="Mapa completo" subtitle="Todas as competências, da nota mais baixa para a mais alta.">
            <CompetencyScoreChart competencies={report.competencies} />
          </Section>

          {report.strengths.length > 0 && (
            <Section title="Onde você manda bem" subtitle="Não é pra relaxar — é pra usar a seu favor.">
              <Flex gap="12px" wrap="wrap">
                {report.strengths.map((strength) => (
                  <Flex
                    key={strength.competencyId}
                    align="center"
                    gap="10px"
                    bg="white"
                    borderWidth="1px"
                    borderColor="blackAlpha.100"
                    borderRadius="12px"
                    px="16px"
                    py="12px"
                  >
                    <Text fontSize="16px" fontWeight="700" color="var(--migue-ink)">
                      {strength.name}
                    </Text>
                    <Badge colorPalette={scorePalette(strength.score)}>{strength.score}/100</Badge>
                  </Flex>
                ))}
              </Flex>
            </Section>
          )}

          <Section title="Como este relatório é calculado">
            <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="24px">
              <Flex as="ul" direction="column" gap="10px" pl="20px">
                <Text as="li" fontSize="15px" color="var(--migue-ink)">
                  <strong>Nota:</strong> cada alternativa tem um peso de 1 a 4. O 4 é quem entende antes de agir, comunica e
                  ajusta; o 1 é o reflexo mais fraco (reagir na hora, esperar alguém, insistir no que não funciona). A nota
                  de cada competência é a média das 3 perguntas, convertida para 0–100.
                </Text>
                <Text as="li" fontSize="15px" color="var(--migue-ink)">
                  <strong>Padrões:</strong> algumas alternativas revelam um reflexo (impulsivo, defensivo, passivo…). Quando
                  o mesmo reflexo aparece em várias situações, ele deixa de ser detalhe e vira padrão.
                </Text>
                <Text as="li" fontSize="15px" color="var(--migue-ink)">
                  <strong>Como você estava no dia:</strong> junta os reflexos típicos de quem está sob pressão, suas
                  respostas nas perguntas de pressão e frustração, e o jeito que você preencheu — o sistema salva o horário
                  de cada resposta, então dá pra ver pressa, pausas, horário e quantas vezes você mudou de ideia. É assim
                  que um avaliador experiente “sabe” que você estava estressado: o padrão entrega.
                </Text>
                <Text as="li" fontSize="15px" color="var(--migue-muted)">
                  É uma leitura das suas respostas, não um diagnóstico. Use como espelho — e responda de novo daqui a
                  algumas semanas pra ver se mudou.
                </Text>
              </Flex>
            </Box>
          </Section>

          <Flex gap="12px" wrap="wrap" pb="8px">
            <Button asChild variant="outline" colorPalette="orange">
              <Link to="/dashboard/behavior">Ver minhas respostas</Link>
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <Box as="section">
      <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="24px">
        {title}
      </Heading>
      {subtitle && (
        <Text fontSize="15px" color="var(--migue-muted)" mt="2px">
          {subtitle}
        </Text>
      )}
      <Box mt="14px">{children}</Box>
    </Box>
  )
}
