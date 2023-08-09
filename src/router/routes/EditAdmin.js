import { lazy } from 'react'

const EditAdmin = lazy(() => import('../../views/pages/admin/admin-management/EditAdmin'))

const EditAdmins = [
  {
    path: '/admin/admin-management/admins/:id/edit',
    element: <EditAdmin />,
    meta: {
      privateRoute:"true",
    }
  },
  
]
 
export default EditAdmins
