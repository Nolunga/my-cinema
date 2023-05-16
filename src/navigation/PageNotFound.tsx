import { Center, Heading } from '@chakra-ui/react'

export default function NotFound() {
  return (
    <Center flexGrow={1} height="100%" width="100%">
      <Heading as="h1" size="2xl">
        Page Not Found
      </Heading>
    </Center>
  )
}
