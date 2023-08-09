import { lazy } from 'react'

const Deals = lazy(() => import('../../views/pages/admin/deals-management/Deals'));


const DealsManagement = [
  {
    path: '/admin/deals-management/deals',
    element: <Deals />,
    meta: {
      privateRoute:"true",
      
    }
  },

]

export default DealsManagement
