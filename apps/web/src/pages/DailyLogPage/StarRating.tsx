import { Button, Flex, RatingGroup, Text } from '@chakra-ui/react'

const LABELS = ['', 'Deu migué', 'Meia-boca', 'De boa', 'Mandei bem', 'Arrebentei']

interface StarRatingProps {
  /** 0 = sem nota. */
  value: number
  onChange: (value: number) => void
}

export function StarRating({ value, onChange }: StarRatingProps) {
  return (
    <Flex align="center" gap="12px" wrap="wrap">
      <RatingGroup.Root
        count={5}
        value={value}
        onValueChange={(details) => onChange(details.value)}
        colorPalette="orange"
        size="lg"
        aria-label="Nota da atividade"
      >
        <RatingGroup.HiddenInput />
        <RatingGroup.Control />
      </RatingGroup.Root>

      <Text fontSize="15px" fontWeight="600" color={value ? 'var(--migue-ink)' : 'var(--migue-muted)'}>
        {value ? LABELS[value] : 'Sem nota por enquanto'}
      </Text>

      {value > 0 && (
        <Button type="button" variant="ghost" size="xs" color="var(--migue-muted)" onClick={() => onChange(0)}>
          tirar nota
        </Button>
      )}
    </Flex>
  )
}
