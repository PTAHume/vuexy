// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "@styles/react/libs/spinner/spinner.scss";

// ** Custom Components
import Avatar from "@components/avatar";
import PageSpinner from "@components/globalspinner/PageSpinner";

// ** Utils
import {
  isAdminUserLoggedIn,
  isUserLoggedIn,
  getReduxAdminUserData,
  baseURL,
  getReduxUserData,
  getUserData,
  getHomeRouteForLoggedInUser,
} from "@utils";

// ** Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../../../redux/authentication"; //admin logout
import {
  updateUserStatus, 
  handleFrontLogout,
} from "../../../../views/pages/front/authentication/store/FrontAuthentication"; //user

// ** Third Party Components
import {
  User,
  Mail,
  // CheckSquare,
  // MessageSquare,
  Settings,
  // CreditCard,
  // HelpCircle,
  Power,
} from "react-feather";
// import { NavDropdown } from "react-bootstrap";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Sanctum Service
import sanctumService from "../../../../@core/auth/sanctum/sanctumService";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/avatars/no-image.png";

const UserDropdown = () => {
  
  {
    /*Lets add variables for status */
  }
  const state = useSelector((state) => state);

  {
    /*Lets check if user is ADmin or not */
  }
  const reduxAdminUserData = getReduxAdminUserData(state);
  const isAdmin = reduxAdminUserData && reduxAdminUserData.type === "admin";
  const isAdminLoggedIn = isAdminUserLoggedIn(state);

  {
    /*Get the user details */
  }
  const reduxUserData = getReduxUserData(state);
  const isFrontUserLoggedIn = isUserLoggedIn(state);

  {
    /*Avatars */
  }
  const Avatars =
    isAdminLoggedIn && reduxAdminUserData?.image
      ? `${baseURL}/${reduxAdminUserData.image}`
      : reduxUserData?.image
      ? `${baseURL}/${reduxUserData.image}`
      : defaultAvatar;


  {/*lets get the user logged in user type */}
  const userType = isAdminLoggedIn
  ? "admin"
  : isFrontUserLoggedIn
  ? "user"
  : null;

  const updateStatusForUserType = async (id, status) => {
    if (userType === 'admin') {
      // Admin is always online, so nothing happens
    } else if (userType === 'user') {
      try {
        const response = await sanctum.setOnlineStatus(id, status);
        if (response.status === 201) {
          toast.promise(
            Promise.resolve(dispatch(updateUserStatus(status))),
            {
              position: "bottom-left",
              loading: "Updating Status...",
              success: () => {
               // navigate(getHomeRouteForLoggedInUser("admin"));
                setIsLoading(false);
                return "Status Updated!";
              },
              error: (error) => {
                console.log(error);
                return "Error updating status!";
              },
            }
          );
          // Let's update user online status in localStorage and Redux
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Unknown user type');
    }
  };
  


  {
    /*Lets update status */
  }

  // console.log (reduxUserData )
  const status = isAdminLoggedIn
    ? "online"
    : reduxUserData.online_status ?? "offline";

  const [logout, setLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const user = getUserData(); // localstorage
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sanctum = new sanctumService();

  useEffect(() => {
    if (logout) {
      setIsLoading(true);
      try {
        if (isAdminLoggedIn) {
          // Call admin logout API here
          sanctum.adminLogout().then((res) => {
            if (res.data.code === 200) {
              toast.promise(
                Promise.resolve(dispatch(handleLogout())), // Ensure that the dispatch() call returns a promise
                {
                  position: "bottom-left",
                  loading: "Logging out...",
                  success: () => {
                    navigate(getHomeRouteForLoggedInUser("admin"));
                    setIsLoading(false);
                    return "Logged out successfully!";
                  },
                  error: (error) => {
                    console.log(error);
                    return "Error Logging out!";
                  },
                }
              );
            }
          });
        } else {
          // Call user logout API here
          sanctum.frontLogout().then((res) => {
            if (res.data.code === 200) {
              toast.promise(
                Promise.resolve(dispatch(handleFrontLogout())), // Ensure that the dispatch() call returns a
                {
                  position: "bottom-left",
                  loading: "Logging out...",
                  success: () => {
                    navigate(getHomeRouteForLoggedInUser(""));
                    setIsLoading(false);
                    return "Logged out successfully!";
                  },
                  error: (error) => {
                    console.log(error);
                    return "Error Logging out!";
                  },
                }
              );
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [logout]);
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

          <Avatar img={Avatars} imgHeight="40" imgWidth="40" status={status} />
        </DropdownToggle>
        <DropdownMenu end>
          {isAdminLoggedIn && isAdmin ? (
            <>
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
                onClick={(e) => e.preventDefault()}
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
          ) : isFrontUserLoggedIn ? (
            <>
              <DropdownItem
                tag={Link}
                to="/"
                onClick={(e) => e.preventDefault()}
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
          ) : (
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
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default UserDropdown;
