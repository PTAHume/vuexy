import { lazy } from 'react'

const EditUser = lazy(() => import('../../views/pages/front/user-management/EditUser'))

const EditUsers = [
    {
        path: '/admin/user-management/users/:id/edit',
        element: <EditUser />,
        meta: {
            privateRoute: "true"
        }
    }
]

export default EditUsers