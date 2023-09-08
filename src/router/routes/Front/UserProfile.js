import { lazy } from 'react'

const UserBio = lazy(() => import('../../../views/pages/front/user/'))

const UserProfile = [
  {
    element: <UserBio />,
    path: '/user/:id',
    meta: {
      className: 'ecommerce-application',
      privateRoute: true
    }
  }

]


export default UserProfile
