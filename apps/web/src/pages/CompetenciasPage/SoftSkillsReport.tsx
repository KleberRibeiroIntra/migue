import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useStore } from '@tanstack/react-store'
import { getSoftSkills } from '../../api/softSkillsApi'
import { StarIcon } from '../../components/icons'
import { levelForRating } from '../../data/softSkills'
import { competenciasStore } from '../../store/competenciasStore'

const MAX_STARS = 5

export function SoftSkillsReport() {
  const ratings = useStore(competenciasStore)
  const {
    data: softSkills,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['soft-skills'],
    queryFn: getSoftSkills,
  })

  return (
    <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="24px">
      <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="20px" mb="20px">
        Relatório de soft skills
      </Heading>

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

      <Flex direction="column" gap="18px">
        {softSkills?.map((skill) => {
          const rating = ratings[skill.name] ?? 0

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
                  <Badge colorPalette={rating >= 4 ? 'green' : 'orange'} size="sm">
                    {levelForRating(rating)}
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
    </Box>
  )
}
