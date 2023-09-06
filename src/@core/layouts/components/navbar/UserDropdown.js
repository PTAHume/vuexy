import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "@styles/react/libs/spinner/spinner.scss"
import Avatar from "@components/avatar"
import PageSpinner from "@components/globalspinner/PageSpinner"
import {
  isAdminUserLoggedIn,
  isUserLoggedIn,
  getReduxAdminUserData,
  baseURL,
  getReduxUserData,
  getHomeRouteForLoggedInUser
} from "@utils"
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "../../../../redux/authentication" //admin logout
import {
  updateUserStatus,
  handleFrontLogout
} from "../../../../views/pages/front/authentication/store/FrontAuthentication" //user
import {
  User,
  Mail,
  Settings,
  Power
} from "react-feather"
import { toast } from 'react-toastify'
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap"
import sanctumService from "../../../../@core/auth/sanctum/sanctumService"
import defaultAvatar from "@src/assets/images/avatars/no-image.png"

const AdminOptions = ({ setLogout, userProfile }) => {
  return <>
    <DropdownItem tag={Link} to="/admin">
      <Settings size={14} className="me-75" />
      <span className="align-middle">Dashboard</span>
    </DropdownItem>
    <DropdownItem tag={Link} to="/">
      <Settings size={14} className="me-75" />
      <span className="align-middle">Home</span>
    </DropdownItem>
    <DropdownItem
      tag={Link}
      to="/"
      onClick={() => userProfile()}
    >
      <User size={14} className="me-75" />
      <span className="align-middle">Profile</span>
    </DropdownItem>
    <DropdownItem
      tag={Link}
      to="/"
      onClick={(e) => e.preventDefault()}
    >
      <Mail size={14} className="me-75" />
      <span className="align-middle">Inbox</span>
    </DropdownItem>
    {/* ... (Other menu items) */}
    <DropdownItem tag={Link} onClick={() => setLogout(true)}>
      <Power size={14} className="me-75" />
      <span className="align-middle">Logout</span>
    </DropdownItem>
  </>
}

const UserOptions = ({ setLogout, userProfile }) => {
  return (
    <>
      <DropdownItem
        tag={Link}
        to="/"
        onClick={() => userProfile()}
      >
        <User size={14} className="me-75" />
        <span className="align-middle">Profile</span>
      </DropdownItem>
      <DropdownItem
        tag={Link}
        to="/"
        onClick={(e) => e.preventDefault()}
      >
        <Mail size={14} className="me-75" />
        <span className="align-middle">Inbox</span>
      </DropdownItem>
      <DropdownItem tag={Link} onClick={() => setLogout(true)}>
        <Power size={14} className="me-75" />
        <span className="align-middle">Logout</span>
      </DropdownItem>

      <UncontrolledDropdown tag="span">
        <DropdownItem
          tag={Link}
          to="/"
          onClick={(e) => e.preventDefault()}
        >
          <User size={14} className="me-75" />
          <span className="align-middle">Status</span>
        </DropdownItem>
        <div className="submenu-wrapper">
          <DropdownMenu end>
            <DropdownItem
              style={{ width: "100%" }}
              onClick={() => updateStatusForUserType(isAdmin ? reduxAdminUserData.id : reduxUserData.id, "online")}
            >
              <span className="align-middle">Online</span>
            </DropdownItem>
            <DropdownItem
              style={{ width: "100%" }}
              onClick={() => updateStatusForUserType(isAdmin ? reduxAdminUserData.id : reduxUserData.id, "offline")}
            >
              <span className="align-middle">Offline</span>
            </DropdownItem>
            <DropdownItem
              style={{ width: "100%" }}
              onClick={() => updateStatusForUserType(isAdmin ? reduxAdminUserData.id : reduxUserData.id, "away")}
            >
              <span className="align-middle">Away</span>
            </DropdownItem>
            <DropdownItem
              style={{ width: "100%" }}
              onClick={() => updateStatusForUserType(isAdmin ? reduxAdminUserData.id : reduxUserData.id, "busy")}
            >
              <span className="align-middle">Busy</span>
            </DropdownItem>
          </DropdownMenu>
        </div>
      </UncontrolledDropdown>
    </>
  )
}

const GuestOptions = () => {
  return (
    <>
      {/* Guest user menu items */}
      <DropdownItem tag={Link} to="/login">
        <User size={14} className="me-75" />
        <span className="align-middle">Login</span>
      </DropdownItem>
      <DropdownItem tag={Link} to="/register">
        <User size={14} className="me-75" />
        <span className="align-middle">Register</span>
      </DropdownItem>
    </>
  )
}

const UserDropdown = () => {
  const reduxAdminUserData = useSelector((state) => getReduxAdminUserData(state))
  const isAdminLoggedIn = useSelector((state) => isAdminUserLoggedIn(state))
  const isAdmin = reduxAdminUserData && reduxAdminUserData.type === "admin"
  const reduxUserData = useSelector((state) => getReduxUserData(state))
  const isFrontUserLoggedIn = useSelector((state) => isUserLoggedIn(state))
  const status = isAdminLoggedIn ? "online" : reduxUserData?.online_status ?? "offline"
  const [logout, setLogout] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sanctum = new sanctumService()
  const userProfile = () => {
    Router.navigate('/')
  }
  const Avatars = () => {
    if (isAdminLoggedIn && reduxAdminUserData?.image) {
      if (`${baseURL}/${reduxAdminUserData.image}`) {
        return reduxUserData?.image
      } else {
        return `${baseURL}/${reduxUserData.image}`
      }
    } else {
      return defaultAvatar
    }
  }

  const userType = isAdminLoggedIn ? "admin" : isFrontUserLoggedIn ? "user" : null
  const updateStatusForUserType = async (id, status) => {
    if (userType === 'admin') {
      // Admin is always online, so nothing happens
    } else if (userType === 'user') {
      try {
        const response = await sanctum.setUserOnlineStatus(id, status)
        if (response.status === 201) {
          toast.promise(
            Promise.resolve(dispatch(updateUserStatus(status))),
            {
              position: "bottom-left",
              loading: "Updating Status...",
              success: () => {
                setIsLoading(false)
                return "Status Updated!"
              },
              error: (error) => {
                console.log(error)
                return "Error updating status!"
              }
            }
          )

          // Let's update user online status in localStorage and Redux
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('Unknown user type')
    }
  }
  useEffect(() => {
    if (logout) {
      setIsLoading(true)
      try {
        if (isAdminLoggedIn) {
          // Call admin logout API here
          sanctum.logoutAdmin().then((res) => {
            if (res.data.code === 200) {
              dispatch(handleLogout())
              navigate(getHomeRouteForLoggedInUser("admin"))
              setIsLoading(false)
              toast.success("Logged out successfully!")
            }
          })
        } else {
          // Call user logout API here
          sanctum.logoutUser().then((res) => {
            if (res.data.code === 200) {
              dispatch(handleFrontLogout())
              navigate(getHomeRouteForLoggedInUser(""))
              setIsLoading(false)
              toast.success("Logged out successfully!")
            }
          })
        }
      } catch (error) {
        toast.error(error?.message || error)
        console.log(error)
        navigate(getHomeRouteForLoggedInUser(""))
      }
    }
  }, [logout])
  return (
    <>
      {isLoading && <PageSpinner />}
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle
          href="/"
          tag="a"
          className="nav-link dropdown-user-link"
          onClick={(e) => e.preventDefault()}
        >
          {isAdminLoggedIn && isAdmin && (
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name fw-bold">
                {reduxAdminUserData.name}
              </span>
              <span className="user-status">{reduxAdminUserData.email}</span>
            </div>
          )}
          {reduxUserData && isFrontUserLoggedIn && (
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name fw-bold">{reduxUserData.name}</span>
              <span className="user-status">{reduxUserData.email}</span>
            </div>
          )}

          <Avatar img={Avatars()} imgHeight="40" imgWidth="40" status={status} />
        </DropdownToggle>
        <DropdownMenu end>
          {
            (() => {
              if (isAdminLoggedIn && isAdmin) return <AdminOptions setLogout={setLogout} userProfile={userProfile} />
              if (isFrontUserLoggedIn) return <UserOptions setLogout={setLogout} userProfile={userProfile} />
              else return <GuestOptions />
            })()
          }
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

export default UserDropdown
