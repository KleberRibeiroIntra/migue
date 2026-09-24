import { Box, Flex, Text } from '@chakra-ui/react'
import { StarIcon } from '../../components/icons'

const LABELS = ['', 'Deu migué', 'Meia-boca', 'De boa', 'Mandei bem', 'Arrebentei']

interface StarRatingProps {
  /** 0 = sem nota. */
  value: number
  onChange: (value: number) => void
}

/** Clicar na estrela que já tá marcada tira a nota. */
export function StarRating({ value, onChange }: StarRatingProps) {
  return (
    <Flex align="center" gap="12px" wrap="wrap">
      <Flex gap="2px">
        {[1, 2, 3, 4, 5].map((star) => (
          <Box key={star} asChild p="2px" cursor="pointer">
            <button
              type="button"
              aria-label={`Nota ${star}: ${LABELS[star]}`}
              aria-pressed={value === star}
              onClick={() => onChange(value === star ? 0 : star)}
            >
              <StarIcon filled={star <= value} width="30" height="30" />
            </button>
          </Box>
        ))}
      </Flex>
      <Text fontSize="15px" fontWeight="600" color={value ? 'var(--migue-ink)' : 'var(--migue-muted)'}>
        {value ? LABELS[value] : 'Sem nota por enquanto'}
      </Text>
    </Flex>
  )
}
