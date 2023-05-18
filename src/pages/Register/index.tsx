import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  useColorMode,
  useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { ScrollView } from '../../components'
import { useAppContext } from '../../context/App'

const RegisterPage = () => {
  const { setColorMode } = useColorMode()

  useEffect(() => {
    setColorMode('light')
  }, [])

  const { user, setUser } = useAppContext()
  const navigate = useNavigate()

  const toast = useToast()

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user])

  const defaultValues = {
    email: '',
    password: ''
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({ defaultValues })

  const onRegister = async ({ email, password }: typeof defaultValues) => {
    try {
      const { data } = await axios.post('http://localhost:4000/register', {
        email,
        password
      })
      setUser(data.user)
      localStorage.setItem('JWT', data.jwt)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error'
      })
    }
  }

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
                Welcome to My Cinema
              </Heading>
              <Text as="small" color="gray.400" marginBottom={8}>
                Please enter your details to continue
              </Text>
              <form onSubmit={() => {}}>
                <fieldset style={{ marginTop: 8 }}>
                  <Input placeholder="Email" marginBottom={5} {...register('email')} />
                  <Input placeholder="Password" type="password" {...register('password')} />
                </fieldset>

                <Button marginY={5} isLoading={isSubmitting} onClick={handleSubmit(onRegister)}>
                  Register
                </Button>
              </form>
              <Text>
                Already have an account?{' '}
                <strong>
                  <Link as={ReactRouterLink} to="/">
                    Login
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

export default RegisterPage
