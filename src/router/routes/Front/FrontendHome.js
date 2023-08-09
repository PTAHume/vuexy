// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const EcommerceShop = lazy(() => import('../../../views/pages/front/offers/shop'))


const Offers = [
  {
    element: <EcommerceShop />,
    path: '/home',
    meta: {
      className: 'ecommerce-application',
      publicRoute: true,
    }
  },
 
]

export default Offers
