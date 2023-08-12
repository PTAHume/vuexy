// ** React Imports
import { Suspense } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
// ** Utils
import { getUserData, getHomeRouteForLoggedInUser, getReduxAdminUserData, isAdminUserLoggedIn, isUserLoggedIn } from "@utils"

const PublicRoute = ({ children, route }) => {

  //lets get the loggedin status for admin and users 
  const isAdminLoggedIn = useSelector((state) => isAdminUserLoggedIn(state))
  const isFrontUserLoggedIn = useSelector((state) => isUserLoggedIn(state))
  const reduxAdminUserData = useSelector((state) => getReduxAdminUserData(state))

  const admin = getUserData()
  
  if (route) {

    const restrictedRoute = route.meta && route.meta.restricted

    if (isAdminLoggedIn && restrictedRoute) {
      return  <Navigate to={getHomeRouteForLoggedInUser((admin?.type || reduxAdminUserData?.type) ?? "")} />
    }

    if (isFrontUserLoggedIn && restrictedRoute) {
      return <Navigate to={getHomeRouteForLoggedInUser("")} />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute
