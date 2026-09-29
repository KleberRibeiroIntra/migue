import { Button, Flex } from '@chakra-ui/react'
import type { ScoreReasonDto } from '../../api/activityApi'

interface ReasonPickerProps {
  reasons: ScoreReasonDto[]
  selectedIds: string[]
  onToggle: (id: string) => void
}

export function ReasonPicker({ reasons, selectedIds, onToggle }: ReasonPickerProps) {
  return (
    <Flex gap="10px" wrap="wrap" pb="4px">
      {reasons.map((reason) => {
        const selected = selectedIds.includes(reason.id)

        return (
          <Button
            key={reason.id}
            type="button"
            size="sm"
            borderRadius="full"
            fontSize="14px"
            // escolhida fica num laranja clarinho: o laranja cheio é só pra ação principal da tela
            variant={selected ? 'subtle' : 'outline'}
            colorPalette="orange"
            color={selected ? 'orange.700' : 'var(--migue-ink)'}
            borderColor={selected ? 'orange.300' : undefined}
            onClick={() => onToggle(reason.id)}
            aria-pressed={selected}
          >
            {reason.description}
          </Button>
        )
      })}
    </Flex>
  )
}
