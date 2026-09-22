import { Store } from '@tanstack/store'

const INITIAL_RATINGS: Record<string, number> = {
  Comunicação: 5,
  'Trabalho em equipe': 5,
  Proatividade: 5,
  'Escuta ativa': 4,
  'Resolução de problemas': 4,
  'Gestão do tempo': 3,
}

export const competenciasStore = new Store<Record<string, number>>(INITIAL_RATINGS)

export function setRatings(ratings: Record<string, number>) {
  competenciasStore.setState(() => ({ ...ratings }))
}
