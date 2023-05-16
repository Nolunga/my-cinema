import { Loadable } from '../components'

const DashboardPage = Loadable(async () => import('../pages/Dashboard'))
const LoginPage = Loadable(async () => import('../pages/Login'))
const ShowPage = Loadable(async () => import('../pages/Show'))

const PUBLIC_ROUTES = [
  {
    exact: true,
    title: 'Login',
    path: '/',
    Element: LoginPage
  }
]

const PRIVATE_ROUTES = [
  {
    exact: true,
    title: 'Dashboard',
    path: '/dashboard',
    Element: DashboardPage
  },
  {
    exact: true,
    title: 'Show',
    path: '/show/:id',
    Element: ShowPage
  }
]

export { PUBLIC_ROUTES, PRIVATE_ROUTES }
