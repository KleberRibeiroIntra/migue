import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Link, useParams } from '@tanstack/react-router'
import { useArticle } from '../../hooks/useArticles'
import { ArticleContent } from './ArticleContent'
import { formatArticleDate } from './articleFormat'

export function ArticlePage() {
  const { slug } = useParams({ from: '/authenticated/blog/$slug' })
  const { data: article, isLoading, isError } = useArticle(slug)

  return (
    <Box maxW="760px">
      <Box
        asChild
        fontSize="14px"
        fontWeight="600"
        color="var(--migue-muted)"
        _hover={{ color: 'var(--migue-accent)' }}
      >
        <Link to="/blog">← Voltar pro blog</Link>
      </Box>

      {isLoading && (
        <Text color="var(--migue-muted)" mt="24px">
          Carregando o artigo...
        </Text>
      )}
      {isError && (
        <Text color="red.600" mt="24px">
          Não achei esse artigo. Vai ver ele nem foi publicado.
        </Text>
      )}

      {article && (
        <Box
          as="article"
          mt="20px"
          bg="white"
          borderWidth="1px"
          borderColor="blackAlpha.100"
          borderRadius="16px"
          px={{ base: '20px', md: '40px' }}
          py={{ base: '24px', md: '36px' }}
        >
          <Text fontSize="14px" color="var(--migue-muted)">
            {formatArticleDate(article.publishedAt ?? article.createdAt)}
          </Text>
          <Heading
            as="h1"
            fontFamily="var(--font-display)"
            color="var(--migue-ink)"
            fontSize="34px"
            lineHeight="1.2"
            mt="6px"
          >
            {article.title}
          </Heading>
          {article.summary && (
            <Text color="var(--migue-muted)" fontSize="18px" mt="8px">
              {article.summary}
            </Text>
          )}
          <Box borderTop="1px solid" borderColor="blackAlpha.100" mt="24px" pt="24px">
            <ArticleContent content={article.content} />
          </Box>
          {article.tags.length > 0 && (
            <Flex
              align="center"
              gap="6px"
              wrap="wrap"
              borderTop="1px solid"
              borderColor="blackAlpha.100"
              mt="32px"
              pt="20px"
            >
              <Text fontSize="14px" fontWeight="600" color="var(--migue-muted)" mr="4px">
                Tags:
              </Text>
              {article.tags.map((tag) => (
                <Badge key={tag.id} colorPalette="orange" variant="subtle">
                  {tag.name}
                </Badge>
              ))}
            </Flex>
          )}
        </Box>
      )}
    </Box>
  )
}
