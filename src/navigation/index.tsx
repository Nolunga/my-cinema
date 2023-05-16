import { Center, Spinner } from '@chakra-ui/react'
import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import { Loadable } from '../components'
import PageNotFoundPage from './PageNotFound'

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes'

const Private = Loadable(() => import('./Private'), {
  fallback: (
    <Center height="100vh">
      <Spinner size="xl" />
    </Center>
  )
})
const Public = Loadable(() => import('./Public'), {
  fallback: (
    <Center height="100vh">
      <Spinner size="xl" />
    </Center>
  )
})

const Navigation = () => {
  return (
    <Routes>
      <Route element={<Public />}>
        {PUBLIC_ROUTES.map(({ Element, path }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>
      <Route element={<Private />}>
        {PRIVATE_ROUTES.map(({ Element, path }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>
      <Route path="*" element={<PageNotFoundPage />} />
    </Routes>
  )
}

export default Navigation
