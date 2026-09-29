import { Box, Button, Field, Flex, HStack, Image, Input, Text, chakra } from '@chakra-ui/react'
import { useNavigate } from '@tanstack/react-router'
import { type FormEvent, useState } from 'react'
import { login } from '../../api/authApi'
import { ApiError } from '../../api/client'
import { setAuth } from '../../store/authStore'

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await login(email, password)
      setAuth(result.token, result.user)
      navigate({ to: '/' })
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError('Email ou senha errados — deu migué.')
      } else {
        setError('Não rolou falar com a API. Tenta de novo.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex as="main" minH="100vh" direction="column" align="center" justify="center" gap="20px" bg="var(--migue-cream)" p="16px">
      <Text fontFamily="var(--font-display)" fontWeight="700" fontSize="28px" color="var(--migue-ink)" textAlign="center">
        entregou ou deu migué?
      </Text>

      <Box w="full" maxW="380px" bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p="32px">
        <HStack gap="10px" mb="24px">
          <Image src="/migue-logo.png" alt="" boxSize="36px" objectFit="contain" />
          <Text fontFamily="var(--font-display)" fontWeight="700" fontSize="24px" color="var(--migue-ink)">
            migué
          </Text>
        </HStack>

        <chakra.form onSubmit={handleSubmit} display="flex" flexDirection="column" gap="16px">
          <Field.Root required>
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              autoComplete="email"
              placeholder="voce@empresa.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Senha</Field.Label>
            <Input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Field.Root>

          {error && (
            <Text color="red.600" fontSize="14px">
              {error}
            </Text>
          )}

          <Button type="submit" colorPalette="orange" loading={loading} loadingText="Entrando...">
            Entrar
          </Button>
        </chakra.form>
      </Box>
    </Flex>
  )
}
