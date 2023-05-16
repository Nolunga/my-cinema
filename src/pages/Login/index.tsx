import { Box, Button, Center, Heading, HStack, Input, Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { ScrollView } from '../../components'

const Login = () => {
  const navigate = useNavigate()

  return (
    <HStack
      backgroundColor="black"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      height="100vh"
      overflow="hidden"
      width="100%"
    >
      <Center backgroundColor="blackAlpha.500" height="100vh" width="100%">
        <Box height="100vh" width="50%">
          <ScrollView className="hide-scrollbar" justifyContent="center" paddingY={10}>
            <Box
              backgroundColor="white"
              borderRadius="3xl"
              margin="0 auto"
              alignSelf="center"
              maxWidth={528}
              paddingX={16}
              paddingY={10}
              textAlign="center"
              width="100%"
            >
              <Heading as="h1" textAlign="center">
                Welcome Back
              </Heading>
              <Text as="small" color="gray.400" marginBottom={8}>
                Please enter your details to continue
              </Text>
              <form onSubmit={() => {}}>
                <fieldset style={{ marginTop: 8 }}>
                  <Input placeholder="Email" marginBottom={5} />
                  <Input placeholder="Password" />
                </fieldset>

                <HStack justifyContent="space-between" marginBottom={10} marginTop={4}>
                  <Text fontSize={16} fontWeight={400} color="black">
                    Forgot password?
                  </Text>
                  <Button
                    // type="submit"
                    marginBottom={4}
                    onClick={() => navigate('dashboard')}
                  >
                    Sign In
                  </Button>
                </HStack>
              </form>
              <Text>
                Don't have an account?{' '}
                <strong>
                  <Link as={ReactRouterLink} to="/sign-up">
                    Sign Up
                  </Link>
                </strong>
              </Text>
            </Box>
          </ScrollView>
        </Box>
      </Center>
    </HStack>
  )
}

export default Login
