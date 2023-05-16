import { HStack, VStack } from '@chakra-ui/react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from '../layout'

export default function Private() {
  const navigate = useNavigate()

  return (
    <HStack height="100vh" width="100vw" spacing={0} overflow="hidden">
      <Sidebar />
      <VStack as="main" height="100vh" spacing={0} width="100%">
        <Outlet />
      </VStack>
    </HStack>
  )
}
