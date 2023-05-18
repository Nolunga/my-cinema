import { Loadable } from '../components'

const DashboardPage = Loadable(async () => import('../pages/Dashboard'))
const LoginPage = Loadable(async () => import('../pages/Login'))
const RegisterPage = Loadable(async () => import('../pages/Register'))
const ShowPage = Loadable(async () => import('../pages/Show'))
const MyShowsPage = Loadable(async () => import('../pages/MyShows'))

const PUBLIC_ROUTES = [
  {
    exact: true,
    title: 'Login',
    path: '/',
    Element: LoginPage
  },
  {
    exact: true,
    title: 'Register',
    path: '/register',
    Element: RegisterPage
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
  },
  {
    exact: true,
    title: 'My Shows',
    path: '/my-shows',
    Element: MyShowsPage
  }
]

export { PUBLIC_ROUTES, PRIVATE_ROUTES }
