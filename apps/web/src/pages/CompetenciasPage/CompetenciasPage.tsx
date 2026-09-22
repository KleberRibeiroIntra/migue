import { Box, Heading, Text } from '@chakra-ui/react'
import { SoftSkillsReport } from './SoftSkillsReport'

export function CompetenciasPage() {
  return (
    <>
      <Box mb="32px">
        <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="32px">
          Minhas competências
        </Heading>
        <Text color="var(--migue-muted)" mt="4px">
          Onde eu desenrolo — o que você manda bem, e onde ainda dá um migué.
        </Text>
      </Box>

      <SoftSkillsReport />
    </>
  )
}
