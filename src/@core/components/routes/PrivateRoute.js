// ** React Imports
import { Navigate } from "react-router-dom";
import {  Suspense } from "react";
import { useSelector } from "react-redux";
import { getUserData, getHomeRouteForLoggedInUser, getReduxAdminUserData, getReduxUserData, getFrontUserData, isAdminUserLoggedIn, isUserLoggedIn } from "@utils";
// ** Spinner Import
import Spinner from "../spinner/Loading-spinner";

const PrivateRoute = ({ children, route }) => {
 

  //lets get the loggedin status for admin and users 
  const state = useSelector((state) => state);
  const isAdminLoggedIn = isAdminUserLoggedIn(state);
  const isFrontUserLoggedIn = isUserLoggedIn(state);

  const reduxAdminUserData = getReduxAdminUserData(state); // we dont use it because it is included in isAdminUserLoggedIn
  const reduxFrontUserData = getReduxUserData(state); // we dont use it because it is included in isUserLoggedIn

  const admin = getUserData();
  const user = getFrontUserData(); //this is fro front end localstorage

  const isAdminRoute = (path) => {
    // Replace '/admin' with the appropriate path prefix for your admin panel routes
    return path.startsWith('/admin');
  };


  if (route) {
   // let action = null;
   // let resource = null;
    let restrictedRoute = false;

    if (route.meta) {
     // action = route.meta.action;
     // resource = route.meta.resource;
      restrictedRoute = route.meta.restricted;
    }
    if (!isAdminLoggedIn && !isFrontUserLoggedIn) {
      //return <Navigate to="/" />;
      return <Navigate to={getHomeRouteForLoggedInUser("")} />;
    }
    if (isFrontUserLoggedIn && !isAdminLoggedIn && isAdminRoute(location.pathname)) {
      //return <Navigate to="admin/" />;
      return  <Navigate to={getHomeRouteForLoggedInUser(( admin?.type || reduxAdminUserData?.type) ?? "")} />;
    }
    if (isAdminLoggedIn && restrictedRoute) {
      //return <Navigate to="admin/" />;
      return  <Navigate to={getHomeRouteForLoggedInUser(( admin?.type || reduxAdminUserData?.type) ?? "")} />;
    }
    if (isFrontUserLoggedIn && restrictedRoute) {
     // return <Navigate to="/" />;
     return <Navigate to={getHomeRouteForLoggedInUser("")} />;
    }
    // if (adminData && restrictedRoute && adminData.type === "vendor") {
    //   return <Navigate to="/access-control" />; // we will change it to merchant panel url
    // } 
    // if (user && !ability.can(action || "read", resource)) {
    //   return <Navigate to="/auth/not-auth" replace />;
    // }
    // if(accessToken === null) {
      // useSanctum().sanctum.refreshToken().then((res) => {
      //   if(res.data.code === 201) {
      //     return <Navigate to="/admin/home" />;
      //   } else {
      //     return <Navigate to="/admin/login" />;
      //   }
      //forward to the gate
      // return <Navigate to="/admin/gate" />;
      // });
    // }
  }

  return (
    <Suspense fallback={<Spinner className="content-loader" />}>
      {children}
    </Suspense>
  );
};

export default PrivateRoute;
