import { Avatar, Badge, Box, Button, Flex, HStack, Image, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-store'
import { useState } from 'react'
import {
  ChevronDownIcon,
  DailyLogIcon,
  DashboardIcon,
  LogoutIcon,
  ProfileIcon,
  ProjectsIcon,
  ReportsIcon,
  UsersIcon,
} from '../icons'
import { authStore, clearAuth } from '../../store/authStore'

const comingSoonNav = [{ label: 'Relatórios', icon: ReportsIcon }]

const profileSubItems = [
  { label: 'Onde eu desenrolo', to: '/dashboard/competency' as const },
  { label: 'Testar meu desenrolo', to: '/softSkills/form' as const },
  { label: 'Sou assim mesmo?', to: '/dashboard/behavior' as const },
  { label: 'Onde eu dou migué', to: '/dashboard/behavior/report' as const },
]

export function SidebarNav() {
  const user = useStore(authStore, (state) => state.user)
  const queryClient = useQueryClient()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

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
      <HStack gap="10px" mb="28px">
        <Image src="/migue-logo.png" alt="Migué" boxSize="36px" objectFit="contain" />
        <Text fontFamily="var(--font-display)" fontWeight="700" fontSize="20px" color="var(--migue-ink)">
          migué
        </Text>
      </HStack>

      <Flex direction="column" gap="4px" flex="1">
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
          bg="orange.50"
          color="var(--migue-accent)"
        >
          <Link to="/">
            <DashboardIcon />
            Dashboard
          </Link>
        </Box>

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
          <Link to="/daily">
            <DailyLogIcon />
            Registro do dia
          </Link>
        </Box>

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
          <Link to="/projects">
            <ProjectsIcon />
            Projetos
          </Link>
        </Box>

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
          <Link to="/users">
            <UsersIcon />
            Usuários
          </Link>
        </Box>

        <Button
          type="button"
          variant="ghost"
          justifyContent="flex-start"
          gap="10px"
          px="12px"
          fontWeight="600"
          fontSize="15px"
          color="var(--migue-muted)"
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
              >
                <Link to={item.to}>{item.label}</Link>
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
