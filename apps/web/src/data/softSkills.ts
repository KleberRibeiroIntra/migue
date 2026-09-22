export interface SoftSkill {
  name: string
  note: string
}

export const softSkills: SoftSkill[] = [
  { name: 'Comunicação', note: 'Manda bem explicando o que travou antes de alguém perguntar.' },
  { name: 'Trabalho em equipe', note: 'Sempre cobre quem tá enrolado, sem drama.' },
  { name: 'Proatividade', note: 'Levanta a mão antes de pedirem.' },
  { name: 'Escuta ativa', note: 'Ouve o feedback antes de sair codando.' },
  { name: 'Resolução de problemas', note: 'Desenrola rápido, às vezes no susto.' },
  { name: 'Gestão do tempo', note: 'Ainda dá uns migués perto do prazo.' },
]

export function levelForRating(rating: number) {
  return rating >= 4 ? 'Avançado' : 'Em desenvolvimento'
}
