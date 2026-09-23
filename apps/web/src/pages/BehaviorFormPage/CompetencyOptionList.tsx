import { Box, Text } from '@chakra-ui/react'

interface CompetencyOptionListProps {
  questionId: string
  options: string[]
  value: number | undefined
  onChange: (index: number) => void
  disabled?: boolean
}

export function CompetencyOptionList({ questionId, options, value, onChange, disabled }: CompetencyOptionListProps) {
  return (
    <Box display="flex" flexDirection="column" gap="8px">
      {options.map((option, index) => {
        const selected = value === index

        return (
          <Box
            as="label"
            key={index}
            display="flex"
            alignItems="flex-start"
            gap="10px"
            borderWidth="1px"
            borderColor={selected ? 'var(--migue-accent)' : 'blackAlpha.200'}
            bg={selected ? 'orange.50' : 'white'}
            borderRadius="10px"
            px="12px"
            py="10px"
            cursor={disabled ? 'default' : 'pointer'}
            opacity={disabled && !selected ? 0.6 : 1}
          >
            <input
              type="radio"
              name={questionId}
              checked={selected}
              disabled={disabled}
              onChange={() => onChange(index)}
              style={{ marginTop: 4, flexShrink: 0 }}
            />
            <Text fontSize="16px" color="var(--migue-ink)">
              {option}
            </Text>
          </Box>
        )
      })}
    </Box>
  )
}
