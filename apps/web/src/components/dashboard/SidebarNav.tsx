import { Avatar, Badge, Box, Button, Flex, HStack, Image, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Link, type LinkProps, useRouterState } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { type ComponentType, type ReactNode, type SVGProps, useState } from 'react'
import {
  ChevronDownIcon,
  DailyLogIcon,
  DashboardIcon,
  LogoutIcon,
  ProfileIcon,
  ProjectsIcon,
  ReportsIcon,
  TagIcon,
  UsersIcon,
} from '../icons'
import { authStore, clearAuth } from '../../store/authStore'

type NavTo = NonNullable<LinkProps['to']>

interface NavItem {
  label: string
  to: NavTo
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const mainNav: NavItem[] = [
  { label: 'Dashboard', to: '/', icon: DashboardIcon },
  { label: 'Registro do dia', to: '/daily', icon: DailyLogIcon },
  { label: 'Projetos', to: '/projects', icon: ProjectsIcon },
  { label: 'Categorias', to: '/score-reason-categories', icon: TagIcon },
]

const comingSoonNav = [{ label: 'Relatórios', icon: ReportsIcon }]

const profileSubItems = [
  { label: 'Onde eu desenrolo', to: '/dashboard/competency' as const },
  { label: 'Testar meu desenrolo', to: '/softSkills/form' as const },
  { label: 'Sou assim mesmo?', to: '/dashboard/behavior' as const },
  { label: 'Onde eu dou migué', to: '/dashboard/behavior/report' as const },
]

/** Estilo do item ativo: o Link do router marca aria-current="page" quando a rota bate. */
const activeStyle = { bg: 'orange.50', color: 'var(--migue-accent)' }

function NavLink({ to, exact = false, children }: { to: NavTo; exact?: boolean; children: ReactNode }) {
  return (
    <Box
      asChild
      display="flex"
      alignItems="center"
      gap="10px"
      px="12px"
      py="10px"
      borderRadius="10px"
      fontWeight="600"
      fontSize="15px"
      color="var(--migue-muted)"
      _hover={{ bg: 'blackAlpha.50', color: 'var(--migue-ink)' }}
      _currentPage={activeStyle}
    >
      {/* "/" é prefixo de tudo: sem exact o Dashboard ficaria sempre marcado */}
      <Link to={to} activeOptions={{ exact }}>
        {children}
      </Link>
    </Box>
  )
}

export function SidebarNav() {
  const user = useStore(authStore, (state) => state.user)
  const queryClient = useQueryClient()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isOnProfilePage = profileSubItems.some((item) => item.to === pathname)
  // já nasce aberto quando a página atual é um item do Perfil, senão o item ativo ficaria escondido
  const [isProfileOpen, setIsProfileOpen] = useState(isOnProfilePage)

  return (
    <Flex
      as="nav"
      direction="column"
      w="260px"
      flexShrink={0}
      bg="white"
      borderRight="1px solid"
      borderColor="blackAlpha.100"
      p="24px"
      gap="6px"
    >
      <HStack asChild gap="10px" mb="28px" alignSelf="flex-start">
        <Link to="/" aria-label="Ir pro dashboard">
          <Image src="/migue-logo.png" alt="" boxSize="36px" objectFit="contain" />
          <Text fontFamily="var(--font-display)" fontWeight="700" fontSize="20px" color="var(--migue-ink)">
            migué
          </Text>
        </Link>
      </HStack>

      <Flex direction="column" gap="4px" flex="1">
        {mainNav.map((item) => (
          <NavLink key={item.label} to={item.to} exact={item.to === '/'}>
            <item.icon />
            {item.label}
          </NavLink>
        ))}

        {comingSoonNav.map((item) => (
          <Button
            key={item.label}
            type="button"
            disabled
            variant="ghost"
            justifyContent="flex-start"
            gap="10px"
            px="12px"
            fontWeight="600"
            fontSize="15px"
            color="var(--migue-muted)"
          >
            <item.icon />
            {item.label}
            <Badge ml="auto" size="sm" colorPalette="gray">
              em breve
            </Badge>
          </Button>
        ))}

        <NavLink to="/users">
          <UsersIcon />
          Usuários
        </NavLink>

        <Button
          type="button"
          variant="ghost"
          justifyContent="flex-start"
          gap="10px"
          px="12px"
          fontWeight="600"
          fontSize="15px"
          color={isOnProfilePage ? 'var(--migue-accent)' : 'var(--migue-muted)'}
          onClick={() => setIsProfileOpen((open) => !open)}
          aria-expanded={isProfileOpen}
        >
          <ProfileIcon />
          Perfil
          <Box ml="auto" display="flex">
            <ChevronDownIcon
              style={{
                transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transformOrigin: 'center',
                transition: 'transform 120ms ease',
              }}
            />
          </Box>
        </Button>

        {isProfileOpen && (
          <Flex direction="column" gap="2px" pl="30px">
            {profileSubItems.map((item) => (
              <Box
                key={item.label}
                asChild
                display="flex"
                alignItems="center"
                borderRadius="8px"
                py="8px"
                px="12px"
                fontWeight="500"
                fontSize="14px"
                color="var(--migue-muted)"
                _hover={{ bg: 'blackAlpha.50', color: 'var(--migue-ink)' }}
                _currentPage={{ ...activeStyle, fontWeight: '600' }}
              >
                {/* exact: /dashboard/behavior não pode acender junto com /dashboard/behavior/report */}
                <Link to={item.to} activeOptions={{ exact: true }}>
                  {item.label}
                </Link>
              </Box>
            ))}
          </Flex>
        )}
      </Flex>

      {user && (
        <HStack gap="10px" px="12px" py="10px" mb="4px" borderTop="1px solid" borderColor="blackAlpha.100" pt="16px">
          <Avatar.Root size="sm">
            <Avatar.Fallback name={user.name} />
          </Avatar.Root>
          <Box overflow="hidden">
            <Text fontWeight="700" fontSize="14px" color="var(--migue-ink)" lineClamp={1}>
              {user.name}
            </Text>
            <Text fontSize="12px" color="var(--migue-muted)" lineClamp={1}>
              {user.email}
            </Text>
          </Box>
        </HStack>
      )}

      <Box
        asChild
        display="flex"
        alignItems="center"
        gap="10px"
        px="12px"
        py="10px"
        borderRadius="10px"
        fontWeight="600"
        fontSize="15px"
        color="var(--migue-muted)"
      >
        <Link
          to="/login"
          onClick={() => {
            clearAuth()
            queryClient.clear()
          }}
        >
          <LogoutIcon />
          Sair
        </Link>
      </Box>
    </Flex>
  )
}
