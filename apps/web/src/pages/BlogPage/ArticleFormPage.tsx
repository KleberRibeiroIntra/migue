import {
  Box,
  Button,
  Checkbox,
  Field,
  Flex,
  Heading,
  Input,
  Portal,
  Select,
  Text,
  Textarea,
  chakra,
  createListCollection,
} from '@chakra-ui/react'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { type FormEvent, useMemo, useState } from 'react'
import type { ArticleDto } from '../../api/articleApi'
import { ApiError } from '../../api/client'
import { useArticleById, useTags, useUpdateArticle } from '../../hooks/useArticles'

interface Draft {
  title: string
  slug: string
  summary: string
  content: string
  published: boolean
  tagIds: string[]
}

type Errors = Partial<Record<'title' | 'slug' | 'content', string>>

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

function toDraft(article: ArticleDto): Draft {
  return {
    title: article.title,
    slug: article.slug,
    summary: article.summary ?? '',
    content: article.content,
    published: !!article.publishedAt,
    tagIds: article.tags.map((tag) => tag.id),
  }
}

export function ArticleFormPage() {
  const { id } = useParams({ from: '/authenticated/blog/edit/$id' })
  const articleQuery = useArticleById(id)

  if (articleQuery.isLoading) return <Text color="var(--migue-muted)">Carregando o artigo...</Text>
  if (!articleQuery.data) return <Text color="red.600">Não achei esse artigo. Talvez tenha sido apagado.</Text>

  // key: trocar de artigo recria o formulário com os dados do novo
  return <ArticleForm key={id} article={articleQuery.data} />
}

function ArticleForm({ article }: { article: ArticleDto }) {
  const navigate = useNavigate()
  const tagsQuery = useTags()
  const updateMutation = useUpdateArticle()
  const [draft, setDraft] = useState<Draft>(() => toDraft(article))
  const [errors, setErrors] = useState<Errors>({})

  const tagCollection = useMemo(
    () =>
      createListCollection({
        items: tagsQuery.data ?? [],
        itemToValue: (tag) => tag.id,
        itemToString: (tag) => tag.name,
      }),
    [tagsQuery.data],
  )

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate(): Errors {
    const found: Errors = {}
    if (!draft.title.trim()) found.title = 'Artigo sem título não rola.'
    if (!SLUG_PATTERN.test(draft.slug.trim())) found.slug = 'Só letra minúscula, número e hífen. Ex: como-nao-dar-migue'
    if (!draft.content.trim()) found.content = 'Escreve alguma coisa aí.'
    return found
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return

    updateMutation.mutate(
      {
        id: article.id,
        request: {
          title: draft.title.trim(),
          slug: draft.slug.trim(),
          summary: draft.summary.trim() || null,
          content: draft.content.trim(),
          published: draft.published,
          tagIds: draft.tagIds,
        },
      },
      {
        // rascunho não abre na página do artigo, então volta pra lista
        onSuccess: (saved) =>
          saved.publishedAt ? navigate({ to: '/blog/$slug', params: { slug: saved.slug } }) : navigate({ to: '/blog' }),
      },
    )
  }

  const serverErrors = updateMutation.error instanceof ApiError ? Object.values(updateMutation.error.errors).flat() : []

  return (
    <Box maxW="760px">
      <Heading fontFamily="var(--font-display)" color="var(--migue-ink)" fontSize="30px">
        Editar artigo
      </Heading>
      <Text color="var(--migue-muted)" fontSize="17px" mt="4px" mb="24px">
        Achou um erro de digitação? Corrige antes que alguém veja.
      </Text>

      <chakra.form onSubmit={handleSubmit} noValidate>
        <Flex
          direction="column"
          gap="16px"
          bg="white"
          borderWidth="1px"
          borderColor="blackAlpha.100"
          borderRadius="16px"
          p="20px"
        >
          <Field.Root invalid={!!errors.title} required>
            <Field.Label>Título</Field.Label>
            <Input value={draft.title} maxLength={200} onChange={(event) => update('title', event.target.value)} />
            <Field.ErrorText>{errors.title}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.slug} required>
            <Field.Label>Slug</Field.Label>
            <Input
              value={draft.slug}
              maxLength={200}
              onChange={(event) => update('slug', event.target.value.toLowerCase())}
            />
            <Field.HelperText>O endereço do artigo: /blog/{draft.slug || '...'}</Field.HelperText>
            <Field.ErrorText>{errors.slug}</Field.ErrorText>
          </Field.Root>

          <Field.Root>
            <Field.Label>Resumo</Field.Label>
            <Textarea
              value={draft.summary}
              maxLength={500}
              rows={2}
              placeholder="Uma frase que aparece no card da lista"
              onChange={(event) => update('summary', event.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Tags</Field.Label>
            <Select.Root
              collection={tagCollection}
              multiple
              closeOnSelect={false}
              value={draft.tagIds}
              onValueChange={(details) => update('tagIds', details.value)}
              disabled={tagsQuery.isLoading}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Sem tag" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.ClearTrigger />
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {tagCollection.items.map((tag) => (
                      <Select.Item key={tag.id} item={tag}>
                        {tag.name}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Field.Root>

          <Field.Root invalid={!!errors.content} required>
            <Field.Label>Texto</Field.Label>
            <Textarea
              value={draft.content}
              rows={18}
              fontFamily="mono"
              fontSize="14px"
              onChange={(event) => update('content', event.target.value)}
            />
            <Field.HelperText>Linha começando com "## " vira subtítulo e "- " vira lista.</Field.HelperText>
            <Field.ErrorText>{errors.content}</Field.ErrorText>
          </Field.Root>

          <Checkbox.Root
            checked={draft.published}
            onCheckedChange={(details) => update('published', details.checked === true)}
            colorPalette="orange"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Publicado (desmarca pra voltar pra rascunho)</Checkbox.Label>
          </Checkbox.Root>
        </Flex>

        <Flex align="center" gap="12px" mt="24px">
          <Button
            type="submit"
            size="lg"
            px="32px"
            borderRadius="14px"
            fontSize="17px"
            loading={updateMutation.isPending}
            colorPalette="orange"
          >
            Salvar alterações
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            colorPalette="orange"
            color="var(--migue-ink)"
            borderRadius="14px"
          >
            <Link to="/blog">Cancelar</Link>
          </Button>
        </Flex>

        {updateMutation.isError && (
          <Box mt="16px">
            <Text color="red.600" fontSize="16px">
              Não deu pra salvar. Tenta de novo.
            </Text>
            {serverErrors.map((message) => (
              <Text key={message} color="red.600" fontSize="14px">
                {message}
              </Text>
            ))}
          </Box>
        )}
      </chakra.form>
    </Box>
  )
}
