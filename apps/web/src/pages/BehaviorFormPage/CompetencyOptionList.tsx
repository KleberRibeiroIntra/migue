import { Box, Text } from '@chakra-ui/react'

interface CompetencyOptionListProps {
  questionId: string
  options: string[]
  value: number | undefined
  onChange: (index: number) => void
}

export function CompetencyOptionList({ questionId, options, value, onChange }: CompetencyOptionListProps) {
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
            cursor="pointer"
          >
            <input
              type="radio"
              name={questionId}
              checked={selected}
              onChange={() => onChange(index)}
              style={{ marginTop: 4, flexShrink: 0 }}
            />
            <Text fontSize="14px" color="var(--migue-ink)">
              {option}
            </Text>
          </Box>
        )
      })}
    </Box>
  )
}
