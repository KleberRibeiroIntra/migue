export interface CompetencyScaleOption {
  value: number
  label: string
}

export const competencyScale: CompetencyScaleOption[] = [
  { value: 1, label: 'Precisa desenvolver' },
  { value: 2, label: 'Em desenvolvimento' },
  { value: 3, label: 'Atende expectativas' },
  { value: 4, label: 'Supera expectativas' },
  { value: 5, label: 'Referência' },
]
