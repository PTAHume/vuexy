import { lazy } from 'react'

const Users = lazy(() => import('../../views/pages/admin/user-management/Users'));
// const Vendors = lazy(() => import('../../views/pages/admin/admin-management/Vendors'));
// const All = lazy(() => import('../../views/pages/admin/admin-management/All'));

const UserManagement = [
  {
    path: '/admin/user-management/users',
    element: <Users />,
    meta: {
      privateRoute:"true",
      
    }
  },

]

export default UserManagement
