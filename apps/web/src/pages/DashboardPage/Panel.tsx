import { Box, Heading, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="20px" h="full">
      <Heading fontSize="18px" fontFamily="var(--font-display)" color="var(--migue-ink)">
        {title}
      </Heading>
      {subtitle && (
        <Text fontSize="14px" color="var(--migue-muted)" mt="2px">
          {subtitle}
        </Text>
      )}
      <Box mt="16px">{children}</Box>
    </Box>
  )
}
