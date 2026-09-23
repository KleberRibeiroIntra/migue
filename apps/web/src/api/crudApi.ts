import { apiFetch } from './client'

/** Espelha o DynamicQueryResult<T> do backend. */
export interface PagedResult<T> {
  pageSize: number
  pageNumber: number
  totalRows: number
  result: T[]
}

export interface PagedParams {
  pageNumber: number
  pageSize: number
}

export interface CrudApi<TResponse, TRequest> {
  getPaged: (params: PagedParams) => Promise<PagedResult<TResponse>>
  getById: (id: string) => Promise<TResponse>
  create: (request: TRequest) => Promise<TResponse>
  update: (id: string, request: TRequest) => Promise<TResponse>
  remove: (id: string) => Promise<void>
}

/**
 * Cria o client de um recurso que segue o padrão de controller do backend:
 * GET /{resource}/paged, GET/PUT/DELETE /{resource}/{id}, POST /{resource}.
 */
export function createCrudApi<TResponse, TRequest>(resource: string): CrudApi<TResponse, TRequest> {
  return {
    getPaged: ({ pageNumber, pageSize }) =>
      apiFetch<PagedResult<TResponse>>(`/${resource}/paged?PageSize=${pageSize}&PageNumber=${pageNumber}`),
    getById: (id) => apiFetch<TResponse>(`/${resource}/${id}`),
    create: (request) =>
      apiFetch<TResponse>(`/${resource}`, { method: 'POST', body: JSON.stringify(request) }),
    update: (id, request) =>
      apiFetch<TResponse>(`/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(request) }),
    remove: (id) => apiFetch<void>(`/${resource}/${id}`, { method: 'DELETE' }),
  }
}
