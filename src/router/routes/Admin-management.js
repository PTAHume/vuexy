import { lazy } from 'react'

const Admins = lazy(() => import('../../views/pages/admin/admin-management/Admins'));
// const Vendors = lazy(() => import('../../views/pages/admin/admin-management/Vendors'));
// const All = lazy(() => import('../../views/pages/admin/admin-management/All'));

const AdminManagement = [
  {
    path: '/admin/admin-management/Admins',
    element: <Admins />,
    meta: {
      privateRoute:"true",
      
    }
  },
  // {
  //   path: '/admin/admin-management/Vendors',
  //   element: <Vendors />,
  //   meta: {
  //     privateRoute:"true",
      
  //   }
  // },
  // {
  //   path: '/admin/admin-management/All',
  //   element: <All />,
  //   meta: {
  //     privateRoute:"true",
      
  //   }
  // },
]

export default AdminManagement
