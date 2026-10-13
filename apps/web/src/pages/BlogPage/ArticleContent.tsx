import { Heading, List, Stack, Text } from '@chakra-ui/react'

/**
 * Markdown bem básico, só o que os artigos usam: blocos separados por linha em branco,
 * "## " vira título e linhas começando com "- " viram lista. O resto é parágrafo.
 */
export function ArticleContent({ content }: { content: string }) {
  const blocks = content
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)

  return (
    <Stack gap="16px">
      {blocks.map((block, index) => {
        if (block.startsWith('## ')) {
          return (
            <Heading
              key={index}
              as="h2"
              fontSize="22px"
              fontFamily="var(--font-display)"
              color="var(--migue-ink)"
              mt="12px"
            >
              {block.slice(3)}
            </Heading>
          )
        }

        const lines = block.split('\n')
        if (lines.every((line) => line.startsWith('- '))) {
          return (
            <List.Root key={index} ps="20px" gap="6px" fontSize="17px" lineHeight="1.7" color="var(--migue-ink)">
              {lines.map((line, lineIndex) => (
                <List.Item key={lineIndex}>{line.slice(2)}</List.Item>
              ))}
            </List.Root>
          )
        }

        return (
          <Text key={index} fontSize="17px" lineHeight="1.7" color="var(--migue-ink)">
            {block}
          </Text>
        )
      })}
    </Stack>
  )
}
