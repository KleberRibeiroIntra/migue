import { useQuery } from '@tanstack/react-query'
import { getMyActivities } from '../api/activityApi'

/** A chave começa com 'activities': registrar no /daily invalida e o dashboard já volta atualizado. */
export function useMyActivities(from: Date, to: Date) {
  return useQuery({
    queryKey: ['activities', 'me', from.toISOString(), to.toISOString()],
    queryFn: () => getMyActivities(from, to),
  })
}
