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
    <Flex gap="10px" wrap="wrap" pb="4px">
      {options.map((option) => {
        const selected = value === option.value

        return (
          <Button
            key={option.value}
            type="button"
            size="md"
            borderRadius="12px"
            fontSize="15px"
            // escolhida fica num laranja clarinho: o laranja cheio é só pra ação principal da tela
            variant={selected ? 'subtle' : 'outline'}
            colorPalette="orange"
            color={selected ? 'orange.700' : 'var(--migue-ink)'}
            borderColor={selected ? 'orange.300' : undefined}
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
