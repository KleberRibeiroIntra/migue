import { Badge, Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { getSoftSkills } from '../../api/softSkillsApi'
import { StarIcon } from '../../components/icons'
import { useMySoftSkillAnswers } from '../../hooks/useSoftSkillAnswers'

const MAX_STARS = 5

function levelForRating(rating: number) {
  if (rating === 0) return { label: 'Sem avaliação', color: 'gray' }
  return rating >= 4 ? { label: 'Avançado', color: 'green' } : { label: 'Em desenvolvimento', color: 'orange' }
}

export function SoftSkillsReport() {
  const softSkillsQuery = useQuery({
    queryKey: ['soft-skills'],
    queryFn: getSoftSkills,
  })
  const answersQuery = useMySoftSkillAnswers()

  const isLoading = softSkillsQuery.isLoading || answersQuery.isLoading
  const isError = softSkillsQuery.isError || answersQuery.isError
  const softSkills = softSkillsQuery.data
  const answers = answersQuery.data
  const ratings = Object.fromEntries((answers ?? []).map((answer) => [answer.softSkillId, answer.value]))
  const lastAnsweredAt = answers?.reduce<string | null>(
    (latest, answer) => (!latest || answer.createdAt > latest ? answer.createdAt : latest),
    null,
  )

  return (
    <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="24px">
      <Flex align="baseline" justify="space-between" gap="12px" mb="20px" wrap="wrap">
        <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="20px">
          Relatório de soft skills
        </Heading>
        {lastAnsweredAt && (
          <Text fontSize="13px" color="var(--migue-muted)">
            Última autoavaliação em {new Date(lastAnsweredAt).toLocaleDateString('pt-BR')}
          </Text>
        )}
      </Flex>

      {isLoading && (
        <Text color="var(--migue-muted)" fontSize="14px">
          Carregando...
        </Text>
      )}

      {isError && (
        <Text color="red.600" fontSize="14px">
          Não foi possível carregar as soft skills da API.
        </Text>
      )}

      {answers && answers.length === 0 && (
        <Flex align="center" justify="space-between" gap="12px" wrap="wrap" bg="orange.50" borderRadius="12px" p="16px" mb="20px">
          <Text fontSize="14px" color="var(--migue-ink)">
            Você ainda não fez sua autoavaliação. Bora ver onde você desenrola?
          </Text>
          <Button asChild size="sm" colorPalette="orange" fontWeight="700">
            <Link to="/softSkills/form">Fazer autoavaliação</Link>
          </Button>
        </Flex>
      )}

      {softSkills && answers && (
        <Flex direction="column" gap="18px">
          {softSkills.map((skill) => {
            const rating = ratings[skill.id] ?? 0
            const level = levelForRating(rating)

            return (
              <Flex
                key={skill.id}
                justify="space-between"
                align="center"
                gap="16px"
                wrap="wrap"
                borderBottom="1px solid"
                borderColor="blackAlpha.50"
                pb="16px"
                _last={{ borderBottom: 'none', pb: 0 }}
              >
                <Box>
                  <Flex align="center" gap="8px" mb="4px">
                    <Text fontWeight="700" fontSize="15px" color="var(--migue-ink)">
                      {skill.name}
                    </Text>
                    <Badge colorPalette={level.color} size="sm">
                      {level.label}
                    </Badge>
                  </Flex>
                  <Text fontSize="13px" color="var(--migue-muted)">
                    {skill.note}
                  </Text>
                </Box>

                <Flex gap="2px" flexShrink={0} aria-label={`${rating} de ${MAX_STARS} estrelas`}>
                  {Array.from({ length: MAX_STARS }).map((_, i) => (
                    <StarIcon key={i} filled={i < rating} />
                  ))}
                </Flex>
              </Flex>
            )
          })}
        </Flex>
      )}
    </Box>
  )
}
