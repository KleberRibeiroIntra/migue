import { Box, Flex, Text } from '@chakra-ui/react'
import type { BarItem } from './weekStats'

interface BarListProps {
  items: BarItem[]
  formatValue: (value: number) => string
  emptyMessage: string
  /** Mais que isso vira "Outros" (evita lista infinita). */
  limit?: number
}

/** Barras horizontais de uma série só: rótulo à esquerda, valor na ponta da barra. */
export function BarList({ items, formatValue, emptyMessage, limit = 6 }: BarListProps) {
  if (items.length === 0) {
    return (
      <Text fontSize="15px" color="var(--migue-muted)">
        {emptyMessage}
      </Text>
    )
  }

  const shown = items.length > limit ? foldRest(items, limit) : items
  const max = Math.max(...shown.map((item) => item.value))

  return (
    <Flex as="ul" direction="column" gap="12px" listStyleType="none">
      {shown.map((item) => (
        <Flex as="li" key={item.label} align="center" gap="12px">
          <Text fontSize="14px" fontWeight="600" color="var(--migue-ink)" w="40%" flexShrink={0} lineClamp={1} title={item.label}>
            {item.label}
          </Text>
          <Flex flex="1" align="center" gap="8px" minW="0">
            <Box
              h="12px"
              w={`${Math.max(2, (item.value / max) * 100)}%`}
              maxW="calc(100% - 56px)"
              bg="var(--migue-accent)"
              borderRightRadius="4px"
              flexShrink={0}
            />
            <Text fontSize="13px" fontWeight="700" color="var(--migue-ink)" whiteSpace="nowrap">
              {formatValue(item.value)}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

function foldRest(items: BarItem[], limit: number): BarItem[] {
  const head = items.slice(0, limit - 1)
  const rest = items.slice(limit - 1).reduce((sum, item) => sum + item.value, 0)
  return [...head, { label: 'Outros', value: rest }]
}
