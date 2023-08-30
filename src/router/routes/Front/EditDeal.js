import { lazy } from 'react'

const EditUserDeals = lazy(() => import('../../../views/pages/front/my-deals/EditDeal'))

const EditMyDeals = [
  {
    path: '/my-deals/:id/edit',
    element: <EditUserDeals />,
    meta: {
      privateRoute:"true"
    }
  }
]

export default EditMyDeals
