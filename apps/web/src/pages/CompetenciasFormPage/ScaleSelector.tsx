import { Button, Flex } from '@chakra-ui/react'

export interface ScaleOption {
  value: number
  label: string
}

interface ScaleSelectorProps {
  value: number
  onChange: (value: number) => void
  options: ScaleOption[]
}

export function ScaleSelector({ value, onChange, options }: ScaleSelectorProps) {
  return (
    <Flex gap="6px" wrap="wrap">
      {options.map((option) => {
        const selected = value === option.value

        return (
          <Button
            key={option.value}
            type="button"
            size="sm"
            variant={selected ? 'solid' : 'outline'}
            colorPalette={selected ? 'orange' : 'gray'}
            borderColor={selected ? undefined : 'blackAlpha.200'}
            color={selected ? undefined : 'var(--migue-muted)'}
            fontWeight="600"
            fontSize="13px"
            onClick={() => onChange(option.value)}
            aria-pressed={selected}
          >
            {option.label}
          </Button>
        )
      })}
    </Flex>
  )
}
