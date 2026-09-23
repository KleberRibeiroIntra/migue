import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react'
import type { CompetencyReportImprovementDto } from '../../api/competencyReportApi'
import { scorePalette } from './scoreColors'

export function ImprovementList({ improvements }: { improvements: CompetencyReportImprovementDto[] }) {
  if (improvements.length === 0) {
    return (
      <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="24px">
        <Text fontSize="16px" color="var(--migue-ink)">
          Nenhuma competência ficou abaixo de 70. Não tem ponto crítico pra atacar — o próximo passo é ajuste fino nos
          padrões abaixo.
        </Text>
      </Box>
    )
  }

  return (
    <Flex direction="column" gap="16px">
      {improvements.map((item, index) => (
        <Box
          key={item.competency}
          bg="white"
          borderWidth="1px"
          borderColor="blackAlpha.100"
          borderLeftWidth="4px"
          borderLeftColor={`${scorePalette(item.score)}.500`}
          borderRadius="16px"
          p="24px"
        >
          <Flex align="center" gap="10px" mb="8px" wrap="wrap">
            <Text fontSize="15px" fontWeight="700" color="var(--migue-muted)">
              #{index + 1}
            </Text>
            <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="22px">
              {item.competency}
            </Heading>
            <Badge colorPalette={scorePalette(item.score)} size="lg">
              {item.score}/100 · {item.level}
            </Badge>
          </Flex>

          <Text fontSize="17px" fontWeight="600" color="var(--migue-ink)" mb="16px">
            {item.problem}
          </Text>

          {item.weakAnswers.length > 0 && (
            <Flex direction="column" gap="12px" mb="16px">
              {item.weakAnswers.map((answer) => (
                <Box key={answer.question} bg="var(--migue-cream)" borderRadius="12px" p="14px">
                  <Text fontSize="15px" color="var(--migue-muted)" mb="8px">
                    {answer.question}
                  </Text>
                  <Text fontSize="15px" color="var(--migue-ink)" mb="4px">
                    <Text as="span" fontWeight="700" color="red.700">
                      Você respondeu:
                    </Text>{' '}
                    {answer.yourAnswer}
                  </Text>
                  <Text fontSize="15px" color="var(--migue-ink)" mb="8px">
                    <Text as="span" fontWeight="700" color="green.700">
                      O mais maduro seria:
                    </Text>{' '}
                    {answer.betterAnswer}
                  </Text>
                  <Text fontSize="14px" color="var(--migue-muted)">
                    {answer.why}
                  </Text>
                </Box>
              ))}
            </Flex>
          )}

          <Text fontSize="15px" fontWeight="700" color="var(--migue-ink)" mb="6px">
            O que fazer a partir de amanhã
          </Text>
          <Flex as="ol" direction="column" gap="6px" pl="22px">
            {item.actions.map((action) => (
              <Text as="li" key={action} fontSize="16px" color="var(--migue-ink)">
                {action}
              </Text>
            ))}
          </Flex>
        </Box>
      ))}
    </Flex>
  )
}
