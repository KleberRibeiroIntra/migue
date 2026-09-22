export interface ActivityRow {
  project: string
  owner: string
  status: string
  statusColor: string
  updated: string
}

export const activity: ActivityRow[] = [
  { project: 'App mobile', owner: 'Ana Lima', status: 'Entregue', statusColor: 'green', updated: 'hoje' },
  { project: 'Relatório fiscal', owner: 'Bruno Reis', status: 'Deu migué', statusColor: 'orange', updated: 'ontem' },
  { project: 'Landing page', owner: 'Carla Nunes', status: 'Em andamento', statusColor: 'gray', updated: 'há 2 dias' },
  { project: 'Integração API', owner: 'Diego Alves', status: 'Entregue', statusColor: 'green', updated: 'há 3 dias' },
]
