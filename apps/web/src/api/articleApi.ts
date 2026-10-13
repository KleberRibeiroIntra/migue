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
