import { Avatar, Badge, Box, Button, Flex, Heading, Progress, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { type FormEvent, useState } from 'react'
import { ApiError } from '../../api/client'
import {
  AssessmentStatus,
  type CompetencyAnswerDto,
  type CompetencyAssessmentDto,
} from '../../api/competencyAssessmentApi'
import { type CompetencyDto, getCompetencies } from '../../api/competencyApi'
import {
  useAutosaveCompetencyAnswer,
  useMyCompetencyAssessment,
  useRestartCompetencyAssessment,
  useSubmitCompetencyAssessment,
} from '../../hooks/useCompetencyAssessment'
import { authStore } from '../../store/authStore'
import { CompetencyOptionList } from './CompetencyOptionList'

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('pt-BR')
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function StatusBadge({ assessment }: { assessment: CompetencyAssessmentDto | null }) {
  if (!assessment) return <Badge colorPalette="gray">Não iniciado</Badge>
  if (assessment.status === AssessmentStatus.Submitted) {
    return <Badge colorPalette="green">Enviado{assessment.submittedAt && ` em ${formatDate(assessment.submittedAt)}`}</Badge>
  }
  return <Badge colorPalette="orange">Rascunho</Badge>
}

export function BehaviorFormPage() {
  const user = useStore(authStore, (state) => state.user)
  // muda a cada "Nova autoavaliação" para remontar o formulário com as respostas do novo rascunho
  const [formVersion, setFormVersion] = useState(0)

  const competenciesQuery = useQuery({
    queryKey: ['competencies'],
    queryFn: getCompetencies,
  })
  const assessmentQuery = useMyCompetencyAssessment()

  const isLoading = competenciesQuery.isLoading || assessmentQuery.isLoading
  const isError = competenciesQuery.isError || assessmentQuery.isError
  const assessment = assessmentQuery.data

  return (
    <Box maxW="720px">
      <Flex align="center" gap="16px" mb="8px" wrap="wrap">
        <Avatar.Root size="md">
          <Avatar.Fallback name={user?.name} />
        </Avatar.Root>
        <Box>
          <Flex align="center" gap="10px" wrap="wrap">
            <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="30px">
              Migué — Mapa de Competências
            </Heading>
            {assessment !== undefined && <StatusBadge assessment={assessment} />}
          </Flex>
          <Text fontSize="15px" color="var(--migue-muted)">
            Autoavaliação situacional · {user?.name ?? 'Você'}
          </Text>
        </Box>
      </Flex>

      <Text color="var(--migue-muted)" fontSize="17px" mb="20px">
        Pra cada situação, escolha a alternativa que mais se parece com o que você realmente faria. Sem migué, hein.
      </Text>

      {isLoading && (
        <Text color="var(--migue-muted)" fontSize="16px" mb="20px">
          Carregando...
        </Text>
      )}

      {isError && (
        <Text color="red.600" fontSize="16px" mb="20px">
          Não foi possível carregar as competências da API.
        </Text>
      )}

      {competenciesQuery.data && assessment !== undefined && (
        <BehaviorForm
          key={formVersion}
          competencies={competenciesQuery.data}
          assessment={assessment}
          onRestarted={() => setFormVersion((version) => version + 1)}
        />
      )}
    </Box>
  )
}

interface BehaviorFormProps {
  competencies: CompetencyDto[]
  assessment: CompetencyAssessmentDto | null
  onRestarted: () => void
}

function BehaviorForm({ competencies, assessment, onRestarted }: BehaviorFormProps) {
  // questionId -> optionId escolhida; nasce das respostas já salvas no rascunho
  const [draft, setDraft] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      (assessment?.answers ?? []).map((answer) => [answer.competencyQuestionId, answer.competencyQuestionOptionId]),
    ),
  )
  const [pendingSaves, setPendingSaves] = useState(0)
  const [failedAnswers, setFailedAnswers] = useState<Record<string, string>>({})
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(assessment?.updatedAt ?? null)

  const autosave = useAutosaveCompetencyAnswer({
    onStart: () => setPendingSaves((count) => count + 1),
    onSaved: (saved, answer) => {
      setLastSavedAt(saved.updatedAt)
      setFailedAnswers((prev) => {
        const next = { ...prev }
        delete next[answer.competencyQuestionId]
        return next
      })
    },
    onFailed: (answer) =>
      setFailedAnswers((prev) => ({ ...prev, [answer.competencyQuestionId]: answer.competencyQuestionOptionId })),
    onDone: () => setPendingSaves((count) => count - 1),
  })
  const submitMutation = useSubmitCompetencyAssessment()
  const restartMutation = useRestartCompetencyAssessment()

  const isSubmitted = assessment?.status === AssessmentStatus.Submitted
  const questions = competencies.flatMap((competency) => competency.questions)
  const totalQuestions = questions.length
  const answeredCount = questions.filter((question) => draft[question.id]).length
  const isComplete = totalQuestions > 0 && answeredCount === totalQuestions
  const failedCount = Object.keys(failedAnswers).length
  const isSaving = pendingSaves > 0

  function saveAnswer(answer: CompetencyAnswerDto) {
    autosave.mutate(answer)
  }

  function handleChange(questionId: string, optionId: string) {
    setDraft((prev) => ({ ...prev, [questionId]: optionId }))
    saveAnswer({ competencyQuestionId: questionId, competencyQuestionOptionId: optionId })
  }

  function retryFailed() {
    for (const [questionId, optionId] of Object.entries(failedAnswers)) {
      saveAnswer({ competencyQuestionId: questionId, competencyQuestionOptionId: optionId })
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isComplete || isSaving || failedCount > 0) return
    submitMutation.mutate()
  }

  function handleRestart() {
    restartMutation.mutate(undefined, { onSuccess: onRestarted })
  }

  const submitErrors =
    submitMutation.error instanceof ApiError
      ? Object.values(submitMutation.error.errors).flat()
      : submitMutation.error
        ? [submitMutation.error.message]
        : []

  return (
    <>
      <Flex align="center" gap="12px" mb="24px" position="sticky" top="0" bg="var(--migue-cream)" py="8px" zIndex="1">
        <Progress.Root value={answeredCount} max={totalQuestions} colorPalette="orange" size="sm" flex="1">
          <Progress.Track borderRadius="full">
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Text fontSize="15px" fontWeight="600" color="var(--migue-muted)" flexShrink={0}>
          {answeredCount} de {totalQuestions}
        </Text>
        {!isSubmitted && (
          <AutosaveStatus isSaving={isSaving} failedCount={failedCount} lastSavedAt={lastSavedAt} onRetry={retryFailed} />
        )}
      </Flex>

      {isSubmitted && (
        <Flex
          align="center"
          justify="space-between"
          gap="12px"
          wrap="wrap"
          bg="green.50"
          borderWidth="1px"
          borderColor="green.200"
          borderRadius="12px"
          p="14px"
          mb="20px"
        >
          <Text fontSize="16px" fontWeight="600" color="green.700">
            Autoavaliação enviada{assessment?.submittedAt && ` em ${formatDate(assessment.submittedAt)}`}! Nada de migué —
            valeu por responder com sinceridade.
          </Text>
          <Flex gap="8px" wrap="wrap">
            <Button asChild size="sm" colorPalette="green" fontWeight="700">
              <Link to="/dashboard/behavior/report">Ver meu relatório</Link>
            </Button>
            <Button size="sm" variant="outline" colorPalette="green" onClick={handleRestart} loading={restartMutation.isPending}>
              Nova autoavaliação
            </Button>
          </Flex>
        </Flex>
      )}

      <Box as="form" onSubmit={handleSubmit}>
        <Flex direction="column" gap="32px">
          {competencies.map((competency) => (
            <Box key={competency.id}>
              <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="20px" mb="14px">
                {competency.order}. {competency.name}
              </Heading>

              <Flex direction="column" gap="16px">
                {[...competency.questions]
                  .sort((a, b) => a.order - b.order)
                  .map((question) => {
                    const options = [...question.options].sort((a, b) => a.order - b.order)
                    const selectedIndex = options.findIndex((option) => option.id === draft[question.id])

                    return (
                      <Box
                        key={question.id}
                        bg="white"
                        borderWidth="1px"
                        borderColor={failedAnswers[question.id] ? 'red.300' : 'blackAlpha.100'}
                        borderRadius="16px"
                        p="18px"
                      >
                        <Text fontWeight="600" fontSize="16px" color="var(--migue-ink)" mb="12px">
                          {question.text}
                        </Text>

                        <CompetencyOptionList
                          questionId={question.id}
                          options={options.map((option) => option.text)}
                          value={selectedIndex >= 0 ? selectedIndex : undefined}
                          onChange={(index) => handleChange(question.id, options[index].id)}
                          disabled={isSubmitted}
                        />
                      </Box>
                    )
                  })}
              </Flex>
            </Box>
          ))}
        </Flex>

        {!isSubmitted && (
          <>
            {submitErrors.map((message) => (
              <Text key={message} color="red.600" fontSize="16px" mt="16px">
                {message}
              </Text>
            ))}

            <Flex align="center" gap="12px" mt="28px" mb="8px">
              <Button
                type="submit"
                colorPalette="orange"
                fontWeight="700"
                disabled={!isComplete || isSaving || failedCount > 0}
                loading={submitMutation.isPending}
              >
                Salvar mapa
              </Button>
              {!isComplete && (
                <Text fontSize="15px" color="var(--migue-muted)">
                  Responda todas as {totalQuestions} perguntas pra salvar. Suas respostas já ficam guardadas.
                </Text>
              )}
            </Flex>
          </>
        )}
      </Box>
    </>
  )
}

interface AutosaveStatusProps {
  isSaving: boolean
  failedCount: number
  lastSavedAt: string | null
  onRetry: () => void
}

function AutosaveStatus({ isSaving, failedCount, lastSavedAt, onRetry }: AutosaveStatusProps) {
  if (isSaving) {
    return (
      <Text fontSize="14px" color="var(--migue-muted)" flexShrink={0}>
        Salvando...
      </Text>
    )
  }

  if (failedCount > 0) {
    return (
      <Flex align="center" gap="6px" flexShrink={0}>
        <Text fontSize="14px" color="red.600">
          {failedCount} resposta(s) não salva(s)
        </Text>
        <Button size="xs" variant="outline" colorPalette="red" onClick={onRetry}>
          Tentar de novo
        </Button>
      </Flex>
    )
  }

  if (!lastSavedAt) return null

  return (
    <Text fontSize="14px" color="green.700" flexShrink={0}>
      Salvo às {formatTime(lastSavedAt)}
    </Text>
  )
}
