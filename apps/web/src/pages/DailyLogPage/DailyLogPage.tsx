import {
  Box,
  Button,
  DatePicker,
  Field,
  Flex,
  Heading,
  Input,
  NumberInput,
  Portal,
  Select,
  Text,
  Textarea,
  chakra,
  createListCollection,
  parseDate,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { type FormEvent, type ReactNode, useMemo, useState } from 'react'
import {
  type ActivityDto,
  ActivityStatus,
  activityApi,
  POSITIVE_SCORE_THRESHOLD,
  ScoreReasonSentiment,
} from '../../api/activityApi'
import { ApiError } from '../../api/client'
import { useProjects, useRegisterActivity, useScoreReasons } from '../../hooks/useDailyLog'
import { CalendarIcon } from '../../components/icons'
import { ACTIVITY_STATUS } from '../../data/activityStatus'
import { authStore } from '../../store/authStore'
import { activityDay } from '../DashboardPage/weekStats'
import { ScaleSelector } from '../CompetenciasFormPage/ScaleSelector'
import { ReasonPicker } from './ReasonPicker'
import { StarRating } from './StarRating'

const STATUS_OPTIONS = [
  ActivityStatus.Completed,
  ActivityStatus.InProgress,
  ActivityStatus.Blocked,
  ActivityStatus.Planned,
  ActivityStatus.Cancelled,
].map((value) => ({ value, label: ACTIVITY_STATUS[value].label }))

const TITLE_MAX = 200
const TEXT_MAX = 2000

function today() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

/** Meio-dia local: o dia não muda quando o backend converte pra UTC. */
function toIsoDate(date: string) {
  return new Date(`${date}T12:00:00`).toISOString()
}

interface Draft {
  title: string
  projectIds: string[]
  status: ActivityStatus
  date: string
  hours: string
  description: string
  score: number
  reasonIds: string[]
  comment: string
}

function emptyDraft(keep?: Pick<Draft, 'projectIds' | 'date'>): Draft {
  return {
    title: '',
    projectIds: keep?.projectIds ?? [],
    status: ActivityStatus.Completed,
    date: keep?.date ?? today(),
    hours: '',
    description: '',
    score: 0,
    reasonIds: [],
    comment: '',
  }
}

/** Preenche o formulário com uma atividade já registrada (modo edição). */
function toDraft(activity: ActivityDto): Draft {
  return {
    title: activity.title,
    projectIds: activity.projects.map((project) => project.id),
    status: activity.status,
    date: activityDay(activity),
    hours: activity.durationMinutes
      ? (activity.durationMinutes / 60).toLocaleString('pt-BR', { maximumFractionDigits: 2 })
      : '',
    description: activity.description ?? '',
    score: activity.selfScore ?? 0,
    reasonIds: activity.scoreReasons.map((reason) => reason.id),
    comment: activity.selfScoreComment ?? '',
  }
}

type Errors = Partial<Record<'title' | 'hours' | 'comment' | 'date', string>>

/** Atende /daily (novo registro) e /daily/$id (edição de um registro que já existe). */
export function DailyLogPage() {
  const { id } = useParams({ strict: false })
  const activityQuery = useQuery({
    queryKey: ['activities', 'detail', id],
    queryFn: () => activityApi.getById(id!),
    enabled: !!id,
  })

  if (!id) return <DailyLogForm />

  if (activityQuery.isLoading) return <Text color="var(--migue-muted)">Carregando o registro...</Text>
  if (!activityQuery.data) return <Text color="red.600">Não achei esse registro. Talvez tenha sido apagado.</Text>

  // key: trocar de registro recria o formulário com os dados do novo
  return <DailyLogForm key={id} activity={activityQuery.data} />
}

function DailyLogForm({ activity }: { activity?: ActivityDto }) {
  const isEdit = !!activity
  const navigate = useNavigate()
  const user = useStore(authStore, (state) => state.user)
  const projectsQuery = useProjects()
  const reasonsQuery = useScoreReasons()
  const registerMutation = useRegisterActivity()

  const [draft, setDraft] = useState<Draft>(() => (activity ? toDraft(activity) : emptyDraft()))
  const [errors, setErrors] = useState<Errors>({})
  // na edição a atividade já existe: salvar vira um update
  const [createdId, setCreatedId] = useState<string | null>(activity?.id ?? null)
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  const sentiment = draft.score >= POSITIVE_SCORE_THRESHOLD ? ScoreReasonSentiment.Positive : ScoreReasonSentiment.Negative
  const reasons = (reasonsQuery.data ?? []).filter((reason) => reason.sentiment === sentiment)
  const projectCollection = useMemo(
    () =>
      createListCollection({
        items: projectsQuery.data ?? [],
        itemToValue: (project) => project.id,
        itemToString: (project) => project.name,
      }),
    [projectsQuery.data],
  )
  const commentRequired = reasons.some((reason) => reason.requiresComment && draft.reasonIds.includes(reason.id))

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    setLastSaved(null)
  }

  function handleScore(score: number) {
    const nextSentiment = score >= POSITIVE_SCORE_THRESHOLD ? ScoreReasonSentiment.Positive : ScoreReasonSentiment.Negative
    // justificativa de nota ruim não serve pra nota boa (e vice-versa): troca de lado, zera
    setDraft((prev) => ({ ...prev, score, reasonIds: nextSentiment === sentiment && score ? prev.reasonIds : [] }))
    setLastSaved(null)
  }

  function toggleReason(id: string) {
    update('reasonIds', draft.reasonIds.includes(id) ? draft.reasonIds.filter((r) => r !== id) : [...draft.reasonIds, id])
  }

  function validate(): Errors {
    const found: Errors = {}
    if (!draft.title.trim()) found.title = 'Conta o que você fez, nem que seja uma linha.'
    if (!draft.date) found.date = 'Escolhe o dia.'
    else if (draft.date > today()) found.date = 'Registrar o futuro já é migué, né?'
    const hours = Number(draft.hours.replace(',', '.'))
    if (draft.hours && (Number.isNaN(hours) || hours <= 0 || hours > 24)) found.hours = 'Coloca um tempo entre 0 e 24 horas.'
    if (commentRequired && !draft.comment.trim()) found.comment = 'Você marcou "Outro", então explica aí o que foi.'
    return found
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!user) return

    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const hours = draft.hours ? Number(draft.hours.replace(',', '.')) : null
    const day = toIsoDate(draft.date)

    registerMutation.mutate(
      {
        activity: {
          userId: user.id,
          projectIds: draft.projectIds,
          title: draft.title.trim(),
          description: draft.description.trim() || null,
          status: draft.status,
          startedAt: day,
          finishedAt: draft.status === ActivityStatus.Completed ? day : null,
          durationMinutes: hours ? Math.round(hours * 60) : null,
        },
        score: draft.score
          ? { selfScore: draft.score, selfScoreComment: draft.comment.trim() || null, scoreReasonIds: draft.reasonIds }
          : null,
        createdId,
        onCreated: setCreatedId,
        clearScore: isEdit && !draft.score && !!activity.selfScore,
      },
      {
        onSuccess: (saved) => {
          if (isEdit) {
            navigate({ to: '/' })
            return
          }
          setLastSaved(saved.title)
          setCreatedId(null)
          setDraft(emptyDraft({ projectIds: draft.projectIds, date: draft.date }))
        },
      },
    )
  }

  const serverErrors =
    registerMutation.error instanceof ApiError ? Object.values(registerMutation.error.errors).flat() : []

  return (
    <Box maxW="720px">
      <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="30px">
        {isEdit ? 'Editar registro' : 'Registro do dia'}
      </Heading>
      <Text color="var(--migue-muted)" fontSize="17px" mt="4px" mb="24px">
        {isEdit
          ? 'Esqueceu algum detalhe? Ajusta aí, sem culpa.'
          : 'Conta aí o que rolou hoje. Anotando agora, ninguém vem dizer depois que você deu migué.'}
      </Text>

      <chakra.form onSubmit={handleSubmit} noValidate>
        <Flex direction="column" gap="16px">
          <Section title="O que você fez?">
            <Field.Root invalid={!!errors.title} required>
              <Input
                value={draft.title}
                maxLength={TITLE_MAX}
                placeholder="Ex: subi a tela de login pra homologação"
                onChange={(event) => update('title', event.target.value)}
              />
              <Field.ErrorText>{errors.title}</Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <Field.Label>Mais detalhes (se quiser)</Field.Label>
              <Textarea
                value={draft.description}
                maxLength={TEXT_MAX}
                rows={3}
                placeholder="Link do PR, com quem você alinhou, o que ficou faltando..."
                onChange={(event) => update('description', event.target.value)}
              />
            </Field.Root>

            <Flex gap="12px" wrap="wrap">
              <Field.Root flex="2" minW="200px">
                <Field.Label>Projetos</Field.Label>
                <Select.Root
                  collection={projectCollection}
                  multiple
                  closeOnSelect={false}
                  value={draft.projectIds}
                  onValueChange={(details) => update('projectIds', details.value)}
                  disabled={projectsQuery.isLoading}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Sem projeto" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.ClearTrigger />
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {projectCollection.items.map((project) => (
                          <Select.Item key={project.id} item={project}>
                            {project.name}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Field.Root>

              <Field.Root flex="1" minW="150px" invalid={!!errors.date}>
                <Field.Label>Dia</Field.Label>
                <DatePicker.Root
                  locale="pt-BR"
                  value={draft.date ? [parseDate(draft.date)] : []}
                  max={parseDate(today())}
                  onValueChange={(details) => update('date', details.value[0]?.toString() ?? '')}
                >
                  <DatePicker.Control>
                    <DatePicker.Input />
                    <DatePicker.IndicatorGroup>
                      <DatePicker.Trigger>
                        <CalendarIcon />
                      </DatePicker.Trigger>
                    </DatePicker.IndicatorGroup>
                  </DatePicker.Control>
                  <Portal>
                    <DatePicker.Positioner>
                      <DatePicker.Content>
                        <DatePicker.View view="day">
                          <DatePicker.Header />
                          <DatePicker.DayTable />
                        </DatePicker.View>
                        <DatePicker.View view="month">
                          <DatePicker.Header />
                          <DatePicker.MonthTable />
                        </DatePicker.View>
                        <DatePicker.View view="year">
                          <DatePicker.Header />
                          <DatePicker.YearTable />
                        </DatePicker.View>
                      </DatePicker.Content>
                    </DatePicker.Positioner>
                  </Portal>
                </DatePicker.Root>
                <Field.ErrorText>{errors.date}</Field.ErrorText>
              </Field.Root>

              <Field.Root flex="1" minW="150px" invalid={!!errors.hours}>
                <Field.Label>Quantas horas?</Field.Label>
                <NumberInput.Root
                  locale="pt-BR"
                  value={draft.hours}
                  min={0}
                  max={24}
                  step={0.5}
                  onValueChange={(details) => update('hours', details.value)}
                >
                  <NumberInput.Control />
                  <NumberInput.Input placeholder="Ex: 1,5" />
                </NumberInput.Root>
                <Field.ErrorText>{errors.hours}</Field.ErrorText>
              </Field.Root>
            </Flex>
          </Section>

          <Section title="Como ficou?">
            <ScaleSelector value={draft.status} onChange={(value) => update('status', value as ActivityStatus)} options={STATUS_OPTIONS} />
          </Section>

          <Section title="Que nota você se dá?" subtitle="Sincerão. É pra você, não pro chefe.">
            <StarRating value={draft.score} onChange={handleScore} />

            {draft.score > 0 && (
              <Box>
                <Text fontWeight="600" fontSize="15px" color="var(--migue-ink)" mb="8px">
                  {sentiment === ScoreReasonSentiment.Positive ? 'O que ajudou?' : 'O que pegou?'}
                </Text>
                {reasonsQuery.isError ? (
                  <Text color="red.600" fontSize="14px">
                    Não rolou carregar as justificativas.
                  </Text>
                ) : (
                  <ReasonPicker reasons={reasons} selectedIds={draft.reasonIds} onToggle={toggleReason} />
                )}
              </Box>
            )}

            {draft.score > 0 && (
              <Field.Root invalid={!!errors.comment} required={commentRequired}>
                <Field.Label>
                  Comentário
                  <Field.RequiredIndicator fallback={<Text as="span" color="var(--migue-muted)" fontWeight="400">(opcional)</Text>} />
                </Field.Label>
                <Textarea
                  value={draft.comment}
                  maxLength={TEXT_MAX}
                  rows={2}
                  placeholder={
                    sentiment === ScoreReasonSentiment.Positive
                      ? 'Ex: o time de infra liberou tudo antes de eu pedir'
                      : 'Ex: esperei o acesso ao banco desde terça'
                  }
                  onChange={(event) => update('comment', event.target.value)}
                />
                <Field.ErrorText>{errors.comment}</Field.ErrorText>
              </Field.Root>
            )}
          </Section>
        </Flex>

        {registerMutation.isError && (
          <Box mt="16px">
            <Text color="red.600" fontSize="16px">
              {createdId && !isEdit
                ? 'A atividade foi salva, mas a nota não. Tenta de novo que só a nota vai.'
                : 'Não deu pra salvar. Tenta de novo.'}
            </Text>
            {serverErrors.map((message) => (
              <Text key={message} color="red.600" fontSize="14px">
                {message}
              </Text>
            ))}
          </Box>
        )}

        {lastSaved && (
          <Text color="green.700" fontSize="16px" fontWeight="600" mt="16px">
            Registrado: "{lastSaved}". Bora pra próxima!
          </Text>
        )}

        <Flex align="center" gap="12px" mt="24px">
          <Button
            type="submit"
            size="lg"
            px="32px"
            borderRadius="14px"
            fontSize="17px"
            loading={registerMutation.isPending}
            colorPalette="orange"
          >
            {isEdit ? 'Salvar alterações' : 'Registrar'}
          </Button>
          {isEdit && (
            <Button asChild size="lg" variant="outline" colorPalette="orange" color="var(--migue-ink)" borderRadius="14px">
              <Link to="/">Cancelar</Link>
            </Button>
          )}
        </Flex>
      </chakra.form>
    </Box>
  )
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="20px">
      <Text fontWeight="700" fontSize="17px" color="var(--migue-ink)">
        {title}
      </Text>
      {subtitle && (
        <Text fontSize="15px" color="var(--migue-muted)">
          {subtitle}
        </Text>
      )}
      <Flex direction="column" gap="14px" mt="12px">
        {children}
      </Flex>
    </Box>
  )
}
