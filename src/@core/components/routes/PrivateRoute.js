// ** React Imports
import { Navigate } from "react-router-dom"
import { Suspense } from "react"
import { useSelector } from "react-redux"
import { getUserData, getHomeRouteForLoggedInUser, getReduxAdminUserData, isAdminUserLoggedIn, isUserLoggedIn } from "@utils"
// ** Spinner Import
import Spinner from "../spinner/Loading-spinner"

const PrivateRoute = ({ children, route }) => {
 
  //lets get the loggedin status for admin and users 
  const isAdminLoggedIn = useSelector((state) => isAdminUserLoggedIn(state))
  const isFrontUserLoggedIn = useSelector((state) => isUserLoggedIn(state))
  const reduxAdminUserData = useSelector((state) => getReduxAdminUserData(state))

  const admin = getUserData()
  //const user = getFrontUserData(); //this is fro front end localstorage

  const isAdminRoute = (path) => {
    // Replace '/admin' with the appropriate path prefix for your admin panel routes
    return path.startsWith('/admin')
  }

  if (route) {

    let restrictedRoute = false

    if (route.meta) {
      restrictedRoute = route.meta.restricted
    }
    if (!isAdminLoggedIn && !isFrontUserLoggedIn) {
      return <Navigate to={getHomeRouteForLoggedInUser("")} />
    }
    if (isFrontUserLoggedIn && !isAdminLoggedIn && isAdminRoute(location.pathname)) {
      return  <Navigate to={getHomeRouteForLoggedInUser((admin?.type || reduxAdminUserData?.type) ?? "")} />
    }
    if (isAdminLoggedIn && restrictedRoute) {
      return  <Navigate to={getHomeRouteForLoggedInUser((admin?.type || reduxAdminUserData?.type) ?? "")} />
    }
    if (isFrontUserLoggedIn && restrictedRoute) {
     return <Navigate to={getHomeRouteForLoggedInUser("")} />
    }
  }

  return (
    <Suspense fallback={<Spinner className="content-loader" />}>
      {children}
    </Suspense>
  )
}

export default PrivateRoute
