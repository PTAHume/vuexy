// ** React Imports
import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// ** Utils
import { getUserData, getHomeRouteForLoggedInUser, getReduxAdminUserData, isAdminUserLoggedIn, isUserLoggedIn } from "@utils";


const PublicRoute = ({ children, route }) => {

  const state = useSelector((state) => state);
  
  //lets get the loggedin status for admin and users 
  const isAdminLoggedIn = isAdminUserLoggedIn(state);
  const isFrontUserLoggedIn = isUserLoggedIn(state);

  const reduxAdminUserData = getReduxAdminUserData(state); // we dont use it because it is included in isAdminUserLoggedIn
  //const reduxFrontUserData = getReduxUserData(state); // we dont use it because it is included in isUserLoggedIn

  const admin = getUserData();
  //const user = getFrontUserData(); //this is fro front end localstorage
  
  if (route) {

    const restrictedRoute = route.meta && route.meta.restricted;

    if (isAdminLoggedIn && restrictedRoute) {
      return  <Navigate to={getHomeRouteForLoggedInUser(( admin?.type || reduxAdminUserData?.type) ?? "")} />;
    }

    if (isFrontUserLoggedIn && restrictedRoute) {
      return <Navigate to={getHomeRouteForLoggedInUser("")} />;
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>;
};

export default PublicRoute;
