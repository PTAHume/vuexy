import { DefaultRoute, DefaultRouteFront } from "../router/routes"
import sanctumService from "../@core/auth/sanctum/sanctumService"
//import { useSelector } from "react-redux"
const sanctum = new sanctumService()
// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = (num) => {
  if (num > 999) {
    return `${(num / 1000).toFixed(1)}k`
  } else {
    return num
  }
}

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "")

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: "short", day: "numeric" }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" }
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

// export const isUserLoggedIn = () => localStorage.getItem("userData")

//get admin details
export const isAdminUserLoggedIn = (state) => {
  const admin = state.authentication.userData
  const adminData = localStorage.getItem("userData")
  return admin && admin.type === "admin" && adminData !== null
}

//get user details
export const isUserLoggedIn = (state) => {
  const user = state.frontauthentication.frontUserData
  const frontUserData = localStorage.getItem("frontUserData")
  return user && frontUserData !== null
}

//base url of website
export const baseURL = `${sanctum.baseurl().replace(/\s/g, "")}` //better to fetch from one place so when we change base url it will be updated globally.

//#########FIND IT WHERE IT HAS BEEN USED AND ADD THERE ADMIN REDUX DATA ALSO##################
export const getUserData = () => JSON.parse(localStorage.getItem("userData"))

{
  /*Lets add the front user data for localstorage */
}
export const getFrontUserData = () => {
  JSON.parse(localStorage.getItem("frontUserData"))
}

//get admin user data FROM REDUX
export const getReduxAdminUserData = (state) => {
  return state.authentication.userData
}
//get frontend user data FROM REDUX
export const getReduxUserData = (state) => {
  return state.frontauthentication.frontUserData
}

{
  /*DONT CONFUSE YOURSELF : getHomeRouteForLoggedInUser is for ADMIN ONLY!!! */
}
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === "admin") {
    return DefaultRoute //DefaultRoute for Admin
  }
  // if (userRole === "vendor") return "/access-control" //we will add here merchant default url
  return DefaultRouteFront //default route for FrontUser
}

{
  /*Lets add default route for FrontUser */
}
// export const getHomeRouteForLoggedInFrontUser = (isUserLoggedIn) => {
//   if (isUserLoggedIn) return DefaultRouteFront; //DefaultRoute for Front user
//   // if (userRole === "vendor") return "/access-control"; //we will add here merchant default url
//   return "/";
// };

// ** React Select Theme Colors

export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed" // for input hover border-color
  }
})
