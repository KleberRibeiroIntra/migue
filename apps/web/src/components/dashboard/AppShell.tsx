import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from '@tanstack/react-router'
import { SidebarNav } from './SidebarNav'

export function AppShell() {
  return (
    <Flex minH="100vh" bg="var(--migue-cream)">
      <SidebarNav />
      <Box flex="1" p="40px" overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  )
}
