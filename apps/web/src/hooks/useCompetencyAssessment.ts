import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  type CompetencyAnswerDto,
  type CompetencyAssessmentDto,
  getMyCompetencyAssessment,
  restartMyCompetencyAssessment,
  saveMyCompetencyAnswer,
  submitMyCompetencyAssessment,
} from '../api/competencyAssessmentApi'

const MY_ASSESSMENT_KEY = ['competency-assessment', 'me']

export function useMyCompetencyAssessment() {
  return useQuery({
    queryKey: MY_ASSESSMENT_KEY,
    queryFn: getMyCompetencyAssessment,
  })
}

function useSetAssessment() {
  const queryClient = useQueryClient()
  return (assessment: CompetencyAssessmentDto) => queryClient.setQueryData(MY_ASSESSMENT_KEY, assessment)
}

interface AutosaveCallbacks {
  onStart: () => void
  onSaved: (assessment: CompetencyAssessmentDto, answer: CompetencyAnswerDto) => void
  onFailed: (answer: CompetencyAnswerDto) => void
  onDone: () => void
}

/**
 * Salvamento automático de cada resposta. O `scope` faz as chamadas rodarem em fila,
 * então cliques rápidos na mesma pergunta chegam ao backend na ordem certa.
 * Os callbacks ficam no hook (e não no `mutate`) porque os do `mutate` só disparam para a última chamada.
 */
export function useAutosaveCompetencyAnswer({ onStart, onSaved, onFailed, onDone }: AutosaveCallbacks) {
  const setAssessment = useSetAssessment()
  return useMutation({
    mutationFn: saveMyCompetencyAnswer,
    scope: { id: 'competency-assessment-autosave' },
    onMutate: onStart,
    onSuccess: (assessment, answer) => {
      setAssessment(assessment)
      onSaved(assessment, answer)
    },
    onError: (_error, answer) => onFailed(answer),
    onSettled: onDone,
  })
}

export function useSubmitCompetencyAssessment() {
  const queryClient = useQueryClient()
  const setAssessment = useSetAssessment()
  return useMutation({
    mutationFn: submitMyCompetencyAssessment,
    onSuccess: (assessment) => {
      setAssessment(assessment)
      // novo envio = novo relatório
      queryClient.invalidateQueries({ queryKey: [...MY_ASSESSMENT_KEY, 'report'] })
    },
  })
}

export function useRestartCompetencyAssessment() {
  const setAssessment = useSetAssessment()
  return useMutation({
    mutationFn: restartMyCompetencyAssessment,
    onSuccess: setAssessment,
  })
}
