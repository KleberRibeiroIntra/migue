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
            variant={selected ? 'solid' : 'outline'}
            colorPalette="orange"
            color={selected ? undefined : 'var(--migue-ink)'}
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
