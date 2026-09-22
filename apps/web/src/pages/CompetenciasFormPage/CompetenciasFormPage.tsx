import { Avatar, Box, Button, Flex, Heading, Progress, Text } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { type FormEvent, useState } from 'react'
import { ScaleSelector } from './ScaleSelector'
import { competencyScale } from '../../data/competencyScale'
import { softSkills } from '../../data/softSkills'
import { authStore } from '../../store/authStore'
import { competenciasStore, setRatings } from '../../store/competenciasStore'

export function CompetenciasFormPage() {
  const navigate = useNavigate()
  const user = useStore(authStore, (state) => state.user)
  const currentRatings = useStore(competenciasStore)
  const [draft, setDraft] = useState<Record<string, number>>(() => ({ ...currentRatings }))

  const answeredCount = softSkills.filter((skill) => (draft[skill.name] ?? 0) > 0).length
  const isComplete = answeredCount === softSkills.length

  function handleChange(skillName: string, value: number) {
    setDraft((prev) => ({ ...prev, [skillName]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isComplete) return
    setRatings(draft)
    navigate({ to: '/dashboard/competency' })
  }

  return (
    <Box maxW="720px">
      <Flex align="center" gap="16px" mb="8px" wrap="wrap">
        <Avatar.Root size="md">
          <Avatar.Fallback name={user?.name} />
        </Avatar.Root>
        <Box>
          <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="28px">
            Mapa de Competências
          </Heading>
          <Text fontSize="13px" color="var(--migue-muted)">
            Autoavaliação · Ciclo 2026 · {user?.name ?? 'Você'}
          </Text>
        </Box>
      </Flex>

      <Text color="var(--migue-muted)" mb="20px">
        Para cada competência, escolha o nível que melhor descreve você hoje. Sem migué, hein.
      </Text>

      <Flex align="center" gap="12px" mb="24px">
        <Progress.Root value={answeredCount} max={softSkills.length} colorPalette="orange" size="sm" flex="1">
          <Progress.Track borderRadius="full">
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Text fontSize="13px" fontWeight="600" color="var(--migue-muted)" flexShrink={0}>
          {answeredCount} de {softSkills.length}
        </Text>
      </Flex>

      <Box as="form" onSubmit={handleSubmit}>
        <Flex direction="column" gap="16px">
          {softSkills.map((skill, index) => (
            <Box
              key={skill.name}
              bg="white"
              borderWidth="1px"
              borderColor="blackAlpha.100"
              borderRadius="16px"
              p="20px"
            >
              <Flex align="baseline" gap="8px" mb="4px">
                <Text fontSize="12px" fontWeight="700" color="var(--migue-muted)">
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <Text fontWeight="700" fontSize="15px" color="var(--migue-ink)">
                  {skill.name}
                </Text>
              </Flex>
              <Text fontSize="13px" color="var(--migue-muted)" mb="14px">
                {skill.note}
              </Text>

              <ScaleSelector
                value={draft[skill.name] ?? 0}
                onChange={(value) => handleChange(skill.name, value)}
                options={competencyScale}
              />
            </Box>
          ))}
        </Flex>

        <Flex align="center" gap="12px" mt="24px">
          <Button type="submit" colorPalette="orange" fontWeight="700" disabled={!isComplete}>
            Salvar mapa
          </Button>
          {!isComplete && (
            <Text fontSize="13px" color="var(--migue-muted)">
              Avalie todas as competências pra salvar.
            </Text>
          )}
        </Flex>
      </Box>
    </Box>
  )
}
