import { Button, Flex } from '@chakra-ui/react'
import type { ScoreReasonDto } from '../../api/activityApi'

interface ReasonPickerProps {
  reasons: ScoreReasonDto[]
  selectedIds: string[]
  onToggle: (id: string) => void
}

export function ReasonPicker({ reasons, selectedIds, onToggle }: ReasonPickerProps) {
  return (
    <Flex gap="6px" wrap="wrap">
      {reasons.map((reason) => {
        const selected = selectedIds.includes(reason.id)

        return (
          <Button
            key={reason.id}
            type="button"
            size="sm"
            borderRadius="full"
            variant={selected ? 'solid' : 'outline'}
            colorPalette={selected ? 'orange' : 'gray'}
            borderColor={selected ? undefined : 'blackAlpha.200'}
            color={selected ? undefined : 'var(--migue-muted)'}
            fontWeight="600"
            fontSize="14px"
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
