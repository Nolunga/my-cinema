import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './main.css'
import Navigation from './navigation'
import theme from './theme'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  </ChakraProvider>
)
