import { apiFetch } from './client'

export interface TagDto {
  id: string
  name: string
}

export interface ArticleDto {
  id: string
  authorId: string
  title: string
  slug: string
  summary: string | null
  content: string
  publishedAt: string | null
  createdAt: string
  tags: TagDto[]
}

/** Artigos publicados, mais recentes primeiro. */
export function getArticles() {
  return apiFetch<ArticleDto[]>('/Article')
}

export function getArticleBySlug(slug: string) {
  return apiFetch<ArticleDto>(`/Article/${encodeURIComponent(slug)}`)
}

export interface ArticleRequest {
  title: string
  slug: string
  summary: string | null
  content: string
  /** Desmarcar volta o artigo pra rascunho. */
  published: boolean
  tagIds: string[]
}

/** Inclusive rascunho: é o que a edição usa. */
export function getArticleById(id: string) {
  return apiFetch<ArticleDto>(`/Article/${id}`)
}

export function updateArticle(id: string, request: ArticleRequest) {
  return apiFetch<ArticleDto>(`/Article/${id}`, { method: 'PUT', body: JSON.stringify(request) })
}

export function getTags() {
  return apiFetch<TagDto[]>('/Article/tags')
}
