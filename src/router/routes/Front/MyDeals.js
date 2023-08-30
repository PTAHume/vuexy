import { lazy } from 'react'

const UserDeals = lazy(() => import('../../../views/pages/front/my-deals/'))

const MyDeals = [
    {
        path: '/my-deals',
        element: <UserDeals />,
        meta: {
            privateRoute: "true"
        }
    }
]

export default MyDeals
