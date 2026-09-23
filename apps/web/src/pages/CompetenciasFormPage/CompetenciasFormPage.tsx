import { Avatar, Box, Button, Flex, Heading, Progress, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { type FormEvent, useState } from 'react'
import type { SoftSkillAnswerDto } from '../../api/softSkillAnswerApi'
import { type SoftSkillDto, getSoftSkills } from '../../api/softSkillsApi'
import { useMySoftSkillAnswers, useSaveMySoftSkillAnswers } from '../../hooks/useSoftSkillAnswers'
import { authStore } from '../../store/authStore'
import { ScaleSelector } from './ScaleSelector'

export function CompetenciasFormPage() {
  const user = useStore(authStore, (state) => state.user)

  const softSkillsQuery = useQuery({
    queryKey: ['soft-skills'],
    queryFn: getSoftSkills,
  })
  const answersQuery = useMySoftSkillAnswers()

  const isLoading = softSkillsQuery.isLoading || answersQuery.isLoading
  const isError = softSkillsQuery.isError || answersQuery.isError

  return (
    <Box maxW="720px">
      <Flex align="center" gap="16px" mb="8px" wrap="wrap">
        <Avatar.Root size="md">
          <Avatar.Fallback name={user?.name} />
        </Avatar.Root>
        <Box>
          <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="30px">
            Mapa de Competências
          </Heading>
          <Text fontSize="15px" color="var(--migue-muted)">
            Autoavaliação · Ciclo 2026 · {user?.name ?? 'Você'}
          </Text>
        </Box>
      </Flex>

      <Text color="var(--migue-muted)" fontSize="17px" mb="20px">
        Para cada competência, escolha o nível que melhor descreve você hoje. Sem migué, hein.
      </Text>

      {isLoading && (
        <Text color="var(--migue-muted)" fontSize="16px" mb="20px">
          Carregando...
        </Text>
      )}

      {isError && (
        <Text color="red.600" fontSize="16px" mb="20px">
          Não foi possível carregar as soft skills da API.
        </Text>
      )}

      {softSkillsQuery.data && answersQuery.data && (
        <SoftSkillsForm softSkills={softSkillsQuery.data} savedAnswers={answersQuery.data} />
      )}
    </Box>
  )
}

interface SoftSkillsFormProps {
  softSkills: SoftSkillDto[]
  savedAnswers: SoftSkillAnswerDto[]
}

/** Separado da página para o rascunho nascer já com as respostas salvas do usuário. */
function SoftSkillsForm({ softSkills, savedAnswers }: SoftSkillsFormProps) {
  const navigate = useNavigate()
  const saveMutation = useSaveMySoftSkillAnswers()

  // softSkillId -> optionId escolhida
  const [draft, setDraft] = useState<Record<string, string>>(() =>
    Object.fromEntries(savedAnswers.map((answer) => [answer.softSkillId, answer.softSkillOptionId])),
  )

  const totalSkills = softSkills.length
  const answeredCount = softSkills.filter((skill) => draft[skill.id]).length
  const isComplete = totalSkills > 0 && answeredCount === totalSkills

  function handleChange(skill: SoftSkillDto, value: number) {
    const option = skill.options.find((o) => o.value === value)
    if (option) setDraft((prev) => ({ ...prev, [skill.id]: option.id }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isComplete) return

    const answers = softSkills.map((skill) => ({ softSkillId: skill.id, softSkillOptionId: draft[skill.id] }))
    saveMutation.mutate(answers, {
      onSuccess: () => navigate({ to: '/dashboard/competency' }),
    })
  }

  return (
    <>
      <Flex align="center" gap="12px" mb="24px">
        <Progress.Root value={answeredCount} max={totalSkills} colorPalette="orange" size="sm" flex="1">
          <Progress.Track borderRadius="full">
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Text fontSize="15px" fontWeight="600" color="var(--migue-muted)" flexShrink={0}>
          {answeredCount} de {totalSkills}
        </Text>
      </Flex>

      <Box as="form" onSubmit={handleSubmit}>
        <Flex direction="column" gap="16px">
          {softSkills.map((skill, index) => {
            const selectedValue = skill.options.find((o) => o.id === draft[skill.id])?.value ?? 0

            return (
              <Box key={skill.id} bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="20px">
                <Flex align="baseline" gap="8px" mb="4px">
                  <Text fontSize="13px" fontWeight="700" color="var(--migue-muted)">
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                  <Text fontWeight="700" fontSize="17px" color="var(--migue-ink)">
                    {skill.name}
                  </Text>
                </Flex>
                <Text fontSize="15px" color="var(--migue-muted)" mb="14px">
                  {skill.note}
                </Text>

                <ScaleSelector
                  value={selectedValue}
                  onChange={(value) => handleChange(skill, value)}
                  options={[...skill.options].sort((a, b) => a.order - b.order)}
                />
              </Box>
            )
          })}
        </Flex>

        {saveMutation.isError && (
          <Text color="red.600" fontSize="16px" mt="16px">
            Não foi possível salvar suas respostas. Tenta de novo.
          </Text>
        )}

        <Flex align="center" gap="12px" mt="24px">
          <Button
            type="submit"
            colorPalette="orange"
            fontWeight="700"
            disabled={!isComplete}
            loading={saveMutation.isPending}
          >
            Salvar mapa
          </Button>
          {!isComplete && (
            <Text fontSize="15px" color="var(--migue-muted)">
              Avalie todas as competências pra salvar.
            </Text>
          )}
        </Flex>
      </Box>
    </>
  )
}
