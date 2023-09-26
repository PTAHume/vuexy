// ** Router imports
import { lazy } from 'react'

// ** Router imports
import { useRoutes, Navigate } from 'react-router-dom'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '@utils'

// ** GetRoutes
import { getRoutes } from './routes'

// ** Components
const Error = lazy(() => import('../views/pages/admin/authentication/Error'))
// const Login = lazy(() => import('../views/pages/admin/authentication/Login'))
const NotAuthorized = lazy(() => import('../views/pages/admin/authentication/NotAuthorized'))


const Router = () => {
  // ** Hooks
  const { layout } = useLayout()

  const allRoutes = getRoutes(layout)
  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
       return getHomeRouteForLoggedInUser(user.type)
      //return getHomeRouteForLoggedInUser("admin")

    } else {
      return '/'
    }
  }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to='/home' />
    },
    {
      path: '/admin',
      index: true,
      element: <Navigate replace to='/admin/home' />
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router
