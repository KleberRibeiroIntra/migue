import { apiFetch } from './client'

export interface CompetencyReportMoodDto {
  /** 0 Tranquilo, 1 Tenso, 2 Estressado, 3 No limite. */
  level: number
  label: string
  /** Índice de pressão de 0 a 100. */
  score: number
  headline: string
  detail: string
  evidence: string[]
}

export interface CompetencyReportPaceDto {
  answeredInRound: number
  startedAt: string | null
  finishedAt: string | null
  activeMinutes: number
  medianSecondsPerAnswer: number | null
  fastAnswers: number
  pauses: number
  totalChanges: number
  answeredLateNight: boolean
}

export interface CompetencyReportPatternDto {
  signal: string
  label: string
  meaning: string
  count: number
  isPressureSignal: boolean
}

export interface CompetencyReportScoreDto {
  competencyId: string
  name: string
  order: number
  score: number
  level: string
}

export interface CompetencyReportWeakAnswerDto {
  question: string
  yourAnswer: string
  betterAnswer: string
  why: string
}

export interface CompetencyReportImprovementDto {
  competency: string
  score: number
  level: string
  problem: string
  actions: string[]
  weakAnswers: CompetencyReportWeakAnswerDto[]
}

export interface CompetencyReportDto {
  assessmentId: string
  submittedAt: string
  totalQuestions: number
  overallScore: number
  verdict: string
  verdictDetail: string
  mood: CompetencyReportMoodDto
  pace: CompetencyReportPaceDto
  patterns: CompetencyReportPatternDto[]
  competencies: CompetencyReportScoreDto[]
  improvements: CompetencyReportImprovementDto[]
  strengths: CompetencyReportScoreDto[]
}

/** Relatório do último questionário enviado; null se o usuário ainda não enviou nenhum (a API devolve 204). */
export async function getMyCompetencyReport() {
  const tzOffsetMinutes = new Date().getTimezoneOffset()
  const report = await apiFetch<CompetencyReportDto | undefined>(
    `/Competency/assessment/me/report?tzOffsetMinutes=${tzOffsetMinutes}`,
  )
  return report ?? null
}
