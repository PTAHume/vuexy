import { lazy } from 'react'

const EditDeal = lazy(() => import('../../views/pages/admin/deals-management/EditDeal'))

const EditDeals = [
  {
    path: '/admin/deals-management/deals/:id/edit',
    element: <EditDeal />,
    meta: {
      privateRoute:"true",
    }
  },
  
]
 
export default EditDeals
