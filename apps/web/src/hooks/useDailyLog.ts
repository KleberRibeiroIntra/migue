import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  type ActivityRequest,
  type ScoreActivityRequest,
  activityApi,
  clearActivityScore,
  getScoreReasons,
  scoreActivity,
} from '../api/activityApi'
import { projectApi } from '../api/projectApi'

export function useScoreReasons() {
  return useQuery({
    queryKey: ['score-reasons'],
    queryFn: getScoreReasons,
    staleTime: Infinity,
  })
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects', 'all'],
    // paginação da API começa em 0
    queryFn: () => projectApi.getPaged({ pageNumber: 0, pageSize: 100 }),
    select: (page) => page.result.filter((project) => project.active),
  })
}

interface RegisterActivityInput {
  activity: ActivityRequest
  /** Sem nota, a atividade é salva sem autoavaliação. */
  score: ScoreActivityRequest | null
  /** Id da atividade já criada numa tentativa anterior em que só a nota falhou: não cria de novo. */
  createdId: string | null
  onCreated: (id: string) => void
  /** Edição em que a nota foi tirada: apaga a autoavaliação que já existia. */
  clearScore?: boolean
}

/** Cria a atividade e, se tiver nota, já manda a autoavaliação (são dois endpoints no backend). */
export function useRegisterActivity() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ activity, score, createdId, onCreated, clearScore = false }: RegisterActivityInput) => {
      let id = createdId
      if (id) {
        await activityApi.update(id, activity)
      } else {
        id = (await activityApi.create(activity)).id
        onCreated(id)
      }
      if (score) return scoreActivity(id, score)
      return clearScore ? clearActivityScore(id) : activityApi.getById(id)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activities'] }),
  })
}
