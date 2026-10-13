import { Badge, Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import type { ArticleDto } from '../../api/articleApi'
import { useArticles } from '../../hooks/useArticles'
import { formatArticleDate } from './articleFormat'

function ArticleCard({ article }: { article: ArticleDto }) {
  return (
    <Box
      asChild
      display="block"
      bg="white"
      borderWidth="1px"
      borderColor="blackAlpha.100"
      borderRadius="16px"
      p="20px"
      transition="border-color 120ms ease, box-shadow 120ms ease"
      _hover={{
        borderColor: 'orange.300',
        boxShadow: '0 6px 16px -8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Link to="/blog/$slug" params={{ slug: article.slug }}>
        <Text fontSize="13px" color="var(--migue-muted)">
          {formatArticleDate(article.publishedAt ?? article.createdAt)}
        </Text>
        <Heading fontSize="20px" fontFamily="var(--font-display)" color="var(--migue-ink)" mt="4px">
          {article.title}
        </Heading>
        {article.summary && (
          <Text color="var(--migue-muted)" fontSize="15px" mt="6px">
            {article.summary}
          </Text>
        )}
        {article.tags.length > 0 && (
          <Flex gap="6px" wrap="wrap" mt="12px">
            {article.tags.map((tag) => (
              <Badge key={tag.id} colorPalette="orange" variant="subtle">
                {tag.name}
              </Badge>
            ))}
          </Flex>
        )}
      </Link>
    </Box>
  )
}

export function BlogPage() {
  const { data: articles, isLoading, isError } = useArticles()

  return (
    <Box maxW="760px">
      <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="30px">
        Blog
      </Heading>
      <Text color="var(--migue-muted)" fontSize="17px" mt="4px" mb="24px">
        Uns textos pra ninguém dizer que você parou no tempo.
      </Text>

      {isLoading && <Text color="var(--migue-muted)">Carregando os artigos...</Text>}
      {isError && <Text color="red.600">Deu ruim pra carregar os artigos. Tenta de novo daqui a pouco.</Text>}
      {articles?.length === 0 && (
        <Text color="var(--migue-muted)">
          Ainda não tem nada por aqui. Daqui a pouco sai post, prometo que não é migué.
        </Text>
      )}

      <Stack gap="12px">
        {articles?.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </Stack>
    </Box>
  )
}
