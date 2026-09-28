import { type ActivityDto, ActivityStatus, ScoreReasonSentiment } from '../../api/activityApi'

const WEEKDAY_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const WORKDAYS = 5

/** Segunda-feira 00:00 (horário local) da semana da data. */
export function startOfWeek(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const daysSinceMonday = (start.getDay() + 6) % 7
  start.setDate(start.getDate() - daysSinceMonday)
  return start
}

export function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

/** Dia local da atividade (yyyy-mm-dd), pelo StartedAt ou, sem ele, pelo CreatedAt. */
export function activityDay(activity: ActivityDto) {
  const date = new Date(activity.startedAt ?? activity.createdAt)
  return toDayKey(date)
}

function toDayKey(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 10)
}

export function formatHours(minutes: number) {
  const hours = minutes / 60
  return `${hours.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}h`
}

/** "22 a 28 de set" ou "29 de set a 5 de out". */
export function formatWeekRange(weekStart: Date) {
  const end = addDays(weekStart, 6)
  const month = (date: Date) => date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
  return weekStart.getMonth() === end.getMonth()
    ? `${weekStart.getDate()} a ${end.getDate()} de ${month(end)}`
    : `${weekStart.getDate()} de ${month(weekStart)} a ${end.getDate()} de ${month(end)}`
}

export interface DayBucket {
  key: string
  label: string
  date: Date
  minutes: number
  count: number
  isWeekend: boolean
  isFuture: boolean
}

export interface BarItem {
  label: string
  value: number
}

export interface WeekStats {
  totalMinutes: number
  activityCount: number
  completed: number
  blocked: number
  /** Média das notas de 1 a 5; null se nenhuma atividade teve nota. */
  averageScore: number | null
  /** Dias úteis com pelo menos um registro. */
  loggedWorkdays: number
  /** Dias úteis que já passaram (ou hoje), pra não cobrar registro do futuro. */
  elapsedWorkdays: number
  days: DayBucket[]
  byProject: BarItem[]
  blockers: BarItem[]
  helpers: BarItem[]
}

export function computeWeekStats(activities: ActivityDto[], weekStart: Date, today = new Date()): WeekStats {
  const todayKey = toDayKey(today)
  const days: DayBucket[] = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(weekStart, index)
    const key = toDayKey(date)
    return {
      key,
      label: WEEKDAY_SHORT[date.getDay()],
      date,
      minutes: 0,
      count: 0,
      isWeekend: index >= WORKDAYS,
      isFuture: key > todayKey,
    }
  })
  const dayByKey = new Map(days.map((day) => [day.key, day]))

  const projectMinutes = new Map<string, number>()
  const blockers = new Map<string, number>()
  const helpers = new Map<string, number>()
  let totalMinutes = 0
  let scoreSum = 0
  let scoreCount = 0

  for (const activity of activities) {
    const minutes = activity.durationMinutes ?? 0
    totalMinutes += minutes

    const day = dayByKey.get(activityDay(activity))
    if (day) {
      day.minutes += minutes
      day.count += 1
    }

    // atividade em mais de um projeto: as horas são divididas igualmente entre eles
    const projects = activity.projects.length > 0 ? activity.projects.map((p) => p.name) : ['Sem projeto']
    for (const name of projects)
      projectMinutes.set(name, (projectMinutes.get(name) ?? 0) + minutes / projects.length)

    if (activity.selfScore) {
      scoreSum += activity.selfScore
      scoreCount += 1
    }

    for (const reason of activity.scoreReasons) {
      const bucket = reason.sentiment === ScoreReasonSentiment.Negative ? blockers : helpers
      const name = reason.categoryName || 'Outros'
      bucket.set(name, (bucket.get(name) ?? 0) + 1)
    }
  }

  const workdays = days.filter((day) => !day.isWeekend)

  return {
    totalMinutes,
    activityCount: activities.length,
    completed: activities.filter((a) => a.status === ActivityStatus.Completed).length,
    blocked: activities.filter((a) => a.status === ActivityStatus.Blocked).length,
    averageScore: scoreCount > 0 ? scoreSum / scoreCount : null,
    loggedWorkdays: workdays.filter((day) => day.count > 0).length,
    elapsedWorkdays: workdays.filter((day) => !day.isFuture).length,
    days,
    byProject: toSortedItems(projectMinutes),
    blockers: toSortedItems(blockers),
    helpers: toSortedItems(helpers),
  }
}

function toSortedItems(values: Map<string, number>): BarItem[] {
  return [...values.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
}

/** Separa as atividades em semana atual e anterior, pra calcular a variação dos números. */
export function splitByWeek(activities: ActivityDto[], weekStart: Date) {
  const startKey = toDayKey(weekStart)
  const current: ActivityDto[] = []
  const previous: ActivityDto[] = []
  for (const activity of activities) (activityDay(activity) >= startKey ? current : previous).push(activity)
  return { current, previous }
}
