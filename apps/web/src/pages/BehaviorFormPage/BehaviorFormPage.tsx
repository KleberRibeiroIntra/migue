import { Avatar, Box, Button, Flex, Heading, Progress, Text } from '@chakra-ui/react'
import { useStore } from '@tanstack/react-store'
import { type FormEvent, useState } from 'react'
import { CompetencyOptionList } from './CompetencyOptionList'
import { competencyMapCategories, competencyMapTitle } from '../../data/competencyMap'
import { authStore } from '../../store/authStore'
import { behaviorStore, setBehaviorAnswers } from '../../store/behaviorStore'

const totalQuestions = competencyMapCategories.reduce((sum, category) => sum + category.questions.length, 0)

export function BehaviorFormPage() {
  const user = useStore(authStore, (state) => state.user)
  const currentAnswers = useStore(behaviorStore)
  const [draft, setDraft] = useState<Record<string, number>>(() => ({ ...currentAnswers }))
  const [submitted, setSubmitted] = useState(false)

  const answeredCount = Object.keys(draft).length
  const isComplete = answeredCount === totalQuestions

  function handleChange(questionId: string, index: number) {
    setDraft((prev) => ({ ...prev, [questionId]: index }))
    setSubmitted(false)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isComplete) return
    setBehaviorAnswers(draft)
    setSubmitted(true)
  }

  return (
    <Box maxW="720px">
      <Flex align="center" gap="16px" mb="8px" wrap="wrap">
        <Avatar.Root size="md">
          <Avatar.Fallback name={user?.name} />
        </Avatar.Root>
        <Box>
          <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="28px">
            {competencyMapTitle}
          </Heading>
          <Text fontSize="13px" color="var(--migue-muted)">
            Autoavaliação situacional · {user?.name ?? 'Você'}
          </Text>
        </Box>
      </Flex>

      <Text color="var(--migue-muted)" mb="20px">
        Pra cada situação, escolha a alternativa que mais se parece com o que você realmente faria. Sem migué, hein.
      </Text>

      <Flex align="center" gap="12px" mb="24px" position="sticky" top="0" bg="var(--migue-cream)" py="8px" zIndex="1">
        <Progress.Root value={answeredCount} max={totalQuestions} colorPalette="orange" size="sm" flex="1">
          <Progress.Track borderRadius="full">
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Text fontSize="13px" fontWeight="600" color="var(--migue-muted)" flexShrink={0}>
          {answeredCount} de {totalQuestions}
        </Text>
      </Flex>

      {submitted && (
        <Box bg="green.50" borderWidth="1px" borderColor="green.200" borderRadius="12px" p="14px" mb="20px">
          <Text fontSize="14px" fontWeight="600" color="green.700">
            Respostas salvas! Nada de migué — valeu por responder com sinceridade.
          </Text>
        </Box>
      )}

      <Box as="form" onSubmit={handleSubmit}>
        <Flex direction="column" gap="32px">
          {competencyMapCategories.map((category) => (
            <Box key={category.title}>
              <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="18px" mb="14px">
                {category.title}
              </Heading>

              <Flex direction="column" gap="16px">
                {category.questions.map((question) => (
                  <Box
                    key={question.id}
                    bg="white"
                    borderWidth="1px"
                    borderColor="blackAlpha.100"
                    borderRadius="16px"
                    p="18px"
                  >
                    <Text fontSize="12px" fontWeight="700" color="var(--migue-muted)" mb="4px">
                      {question.id}
                    </Text>
                    <Text fontWeight="600" fontSize="14px" color="var(--migue-ink)" mb="12px">
                      {question.text}
                    </Text>

                    <CompetencyOptionList
                      questionId={question.id}
                      options={question.options}
                      value={draft[question.id]}
                      onChange={(index) => handleChange(question.id, index)}
                    />
                  </Box>
                ))}
              </Flex>
            </Box>
          ))}
        </Flex>

        <Flex align="center" gap="12px" mt="28px" mb="8px">
          <Button type="submit" colorPalette="orange" fontWeight="700" disabled={!isComplete}>
            Salvar mapa
          </Button>
          {!isComplete && (
            <Text fontSize="13px" color="var(--migue-muted)">
              Responda todas as {totalQuestions} perguntas pra salvar.
            </Text>
          )}
        </Flex>
      </Box>
    </Box>
  )
}
