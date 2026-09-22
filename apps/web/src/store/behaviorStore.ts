import { Store } from '@tanstack/store'

export const behaviorStore = new Store<Record<string, number>>({})

export function setBehaviorAnswers(answers: Record<string, number>) {
  behaviorStore.setState(() => ({ ...answers }))
}
