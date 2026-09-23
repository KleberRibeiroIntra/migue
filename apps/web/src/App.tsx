import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { RouterProvider } from '@tanstack/react-router'
import { ApiError, setUnauthorizedHandler } from './api/client'
import { router } from './router'
import { authStore, clearAuth } from './store/authStore'

const MAX_QUERY_RETRIES = 3

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 401 não melhora tentando de novo: a sessão acabou
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.status === 401) && failureCount < MAX_QUERY_RETRIES,
    },
  },
})

// Sessão expirada ou token inválido: limpa tudo e volta para o login.
setUnauthorizedHandler(() => {
  // várias requisições podem voltar 401 juntas; só a primeira faz o logout
  if (!authStore.state.token) return

  clearAuth()
  queryClient.clear()
  router.navigate({ to: '/login' })
})

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <TanStackDevtools  />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
