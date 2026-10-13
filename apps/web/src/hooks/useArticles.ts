import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  type ArticleRequest,
  getArticleById,
  getArticleBySlug,
  getArticles,
  getTags,
  updateArticle,
} from '../api/articleApi'

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

export function useArticleById(id: string) {
  return useQuery({
    queryKey: ['articles', 'detail', id],
    queryFn: () => getArticleById(id),
  })
}

export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  })
}

/** Salvar invalida tudo de 'articles': lista e página do artigo voltam atualizadas. */
export function useUpdateArticle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: ArticleRequest }) => updateArticle(id, request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
  })
}
