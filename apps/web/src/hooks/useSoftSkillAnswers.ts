import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMySoftSkillAnswers, saveMySoftSkillAnswers } from '../api/softSkillAnswerApi'

const MY_ANSWERS_KEY = ['soft-skill-answers', 'me']

export function useMySoftSkillAnswers() {
  return useQuery({
    queryKey: MY_ANSWERS_KEY,
    queryFn: getMySoftSkillAnswers,
  })
}

export function useSaveMySoftSkillAnswers() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveMySoftSkillAnswers,
    // o POST já devolve as respostas atualizadas, então o relatório não precisa refazer o GET
    onSuccess: (answers) => queryClient.setQueryData(MY_ANSWERS_KEY, answers),
  })
}
