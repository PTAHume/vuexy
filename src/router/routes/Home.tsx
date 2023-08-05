import { lazy } from 'react'

const Home = lazy(() => import('../../views/pages/admin/main/Home'))

const HomeRoutes = [
  {
    path: '/admin/home',
    element: <Home />,
    meta: {
      privateRoute:"true",
    }
  },
  
]

export default HomeRoutes
