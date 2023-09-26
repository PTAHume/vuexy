// ** React Imports
import { Fragment } from 'react'

// ** Routes Imports
import AuthenticationRoutes from './Authentication'
// import Home from '../../views/pages/admin/main/Home'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper'

// ** Route Components
import PublicRoute from '@components/routes/PublicRoute'
import PrivateRoute from '@components/routes/PrivateRoute'

// ** Utils
import { isObjEmpty } from '@utils'
import HomeRoutes from './Home'
import AdminManagement from './Admin-management'
import EditAdmins from './EditAdmin'
import DealsManagement from './DealManagement'
import EditDeals from './EditDeal'
import EditUsers from './EditUser'
import UserManagement from './user-management'
import Offers from './Front/FrontendHome'
import UserAuthenticationRoutes from './Front/UserAuthentication'
import MyChats from './Front/MyChats'
import AddDeal from './Front/AddDeal'
import MyDeals from './Front/MyDeals'
import EditMyDeals from './Front/EditDeal'
import UserProfile from './Front/UserProfile'
import License from './Front/ContactUs'

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = 'Instant Deals Website'

// ** Default Route
const DefaultRoute = '/admin'
const DefaultRouteFront = '/'

// ** Merge Routes
const Routes = [
  ...AuthenticationRoutes,
  ...AdminManagement,
  ...HomeRoutes,
  ...EditAdmins,
  ...EditDeals,
  ...DealsManagement,
  ...EditUsers,
  ...UserManagement,
  // ...FrontendRoutes,
  ...Offers,
  ...UserAuthenticationRoutes,
  ...MyChats,
  ...AddDeal,
  ...MyDeals,
  ...EditMyDeals,
  ...UserProfile,
  ...License
]

const getRouteMeta = route => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter(route => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route?.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        let RouteTag = PrivateRoute

        // ** Check for public or private route
        if (route.meta) {
          isBlank = route.meta.layout === 'blank'
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
              LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = layout => {
  const defaultLayout = layout || 'vertical'
  const layouts = ['vertical', 'horizontal', 'blank']

  const AllRoutes = []

  layouts.forEach(layoutItem => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, DefaultRouteFront, TemplateTitle, Routes, getRoutes } 
