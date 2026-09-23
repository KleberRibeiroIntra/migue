/** Faixas de nota do relatório (mesmos cortes do backend). A cor sempre acompanha o rótulo em texto. */
export function scorePalette(score: number) {
  if (score >= 80) return 'green'
  if (score >= 60) return 'yellow'
  if (score >= 40) return 'orange'
  return 'red'
}

/** Cor do nível de pressão: 0 Tranquilo, 1 Tenso, 2 Estressado, 3 No limite. */
export function moodPalette(level: number) {
  return ['green', 'yellow', 'orange', 'red'][level] ?? 'gray'
}
