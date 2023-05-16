import { Card, Flex, LinkBox, useColorMode } from '@chakra-ui/react'
import { HiHeart, HiHome, HiOutlineLogout, HiUserCircle } from 'react-icons/hi'
import { MdLightMode, MdOutlineLightMode } from 'react-icons/md'
import { NavLink, useLocation } from 'react-router-dom'
import { ScrollView } from '../components'

const LINKS = [
  {
    route: '/dashboard',
    icon: HiHome
  },
  {
    route: '/my-shows',
    icon: HiHeart
  },
  {
    route: '/profile',
    icon: HiUserCircle
  }
]

const Sidebar = () => {
  const { pathname } = useLocation()

  const { colorMode, toggleColorMode } = useColorMode()

  const color = colorMode === 'dark' ? 'white' : '#242529'

  return (
    <Card flex="none" height="100vh" maxWidth={100} width="100%">
      <ScrollView paddingTop={4}>
        {LINKS.map(({ icon: Icon, route }, i) => {
          const isActive = pathname.includes(route)
          return (
            <LinkBox key={i} as={NavLink} to={route}>
              <Flex
                backgroundColor={isActive ? '#242529' : 'transparent'}
                borderRadius="lg"
                height={12}
                marginX={4}
                marginBottom={2}
                justifyContent="center"
                alignItems="center"
              >
                <Icon size={24} color={isActive ? 'white' : color} />
              </Flex>
            </LinkBox>
          )
        })}
      </ScrollView>
      <Flex flexDirection="column" width="100%">
        <Flex
          cursor="pointer"
          onClick={toggleColorMode}
          justifyContent="center"
          alignItems="center"
          boxSize={20}
          alignSelf="center"
        >
          {colorMode === 'dark' ? <MdOutlineLightMode size={24} /> : <MdLightMode size={24} />}
        </Flex>
        <Flex
          cursor="pointer"
          height={12}
          marginBottom={4}
          onClick={() => {}}
          alignItems="center"
          justifyContent="center"
        >
          <HiOutlineLogout size={24} color={color} />
        </Flex>
      </Flex>
    </Card>
  )
}
export default Sidebar
