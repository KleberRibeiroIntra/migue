import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  type ActivityRequest,
  type ScoreActivityRequest,
  activityApi,
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
    queryFn: () => projectApi.getPaged({ pageNumber: 1, pageSize: 100 }),
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
}

/** Cria a atividade e, se tiver nota, já manda a autoavaliação (são dois endpoints no backend). */
export function useRegisterActivity() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ activity, score, createdId, onCreated }: RegisterActivityInput) => {
      let id = createdId
      if (id) {
        await activityApi.update(id, activity)
      } else {
        id = (await activityApi.create(activity)).id
        onCreated(id)
      }
      return score ? scoreActivity(id, score) : activityApi.getById(id)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activities'] }),
  })
}
