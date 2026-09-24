import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMySoftSkillAnswers, getMySoftSkillReport, saveMySoftSkillAnswers } from '../api/softSkillAnswerApi'

const MY_ANSWERS_KEY = ['soft-skill-answers', 'me']
const MY_REPORT_KEY = [...MY_ANSWERS_KEY, 'report']

export function useMySoftSkillAnswers() {
  return useQuery({
    queryKey: MY_ANSWERS_KEY,
    queryFn: getMySoftSkillAnswers,
  })
}

export function useMySoftSkillReport() {
  return useQuery({
    queryKey: MY_REPORT_KEY,
    queryFn: getMySoftSkillReport,
  })
}

export function useSaveMySoftSkillAnswers() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveMySoftSkillAnswers,
    onSuccess: (answers) => {
      // o POST já devolve as respostas atualizadas, então o relatório de estrelas não precisa refazer o GET
      queryClient.setQueryData(MY_ANSWERS_KEY, answers)
      // a análise depende do histórico todo: essa refaz
      queryClient.invalidateQueries({ queryKey: MY_REPORT_KEY })
    },
  })
}
