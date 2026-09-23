import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CrudApi, PagedParams } from '../api/crudApi'

/**
 * Hooks de React Query para um recurso CRUD. Todas as mutations invalidam
 * as queries do recurso, então a listagem se atualiza sozinha.
 */
export function createCrudHooks<TResponse, TRequest>(queryKey: string, api: CrudApi<TResponse, TRequest>) {
  function useInvalidate() {
    const queryClient = useQueryClient()
    return () => queryClient.invalidateQueries({ queryKey: [queryKey] })
  }

  return {
    usePaged: (params: PagedParams) =>
      useQuery({
        queryKey: [queryKey, 'paged', params],
        queryFn: () => api.getPaged(params),
        placeholderData: keepPreviousData,
      }),

    useById: (id: string | undefined) =>
      useQuery({
        queryKey: [queryKey, 'detail', id],
        queryFn: () => api.getById(id!),
        enabled: !!id,
      }),

    useCreate: () => {
      const invalidate = useInvalidate()
      return useMutation({
        mutationFn: (request: TRequest) => api.create(request),
        onSuccess: invalidate,
      })
    },

    useUpdate: () => {
      const invalidate = useInvalidate()
      return useMutation({
        mutationFn: ({ id, request }: { id: string; request: TRequest }) => api.update(id, request),
        onSuccess: invalidate,
      })
    },

    useRemove: () => {
      const invalidate = useInvalidate()
      return useMutation({
        mutationFn: (id: string) => api.remove(id),
        onSuccess: invalidate,
      })
    },
  }
}

export type CrudHooks<TResponse, TRequest> = ReturnType<typeof createCrudHooks<TResponse, TRequest>>
