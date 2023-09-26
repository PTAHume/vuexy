//contact-us

// ** React Imports
import { lazy } from 'react'

const License = lazy(() => import('../../../views/pages/front/license/'))


const AddDeal = [
    {
        element: <License />,
        path: '/contact-us',
        meta: {
            className: 'ecommerce-application',
            privateRoute: true
        }
    }

]

export default AddDeal