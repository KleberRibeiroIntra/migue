import { useQuery } from '@tanstack/react-query'
import { getArticleBySlug, getArticles } from '../api/articleApi'

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  })
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['articles', slug],
    queryFn: () => getArticleBySlug(slug),
  })
}
