// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const DealAdd = lazy(() => import('../../../views/pages/front/add-deal/'))


const AddDeal = [
  {
    element: <DealAdd />,
    path: '/add-deal',
    meta: {
      className: 'ecommerce-application',
      publicRoute: true
    }
  }
 
]

export default AddDeal
