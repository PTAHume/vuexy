// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { getReduxUserData } from '@utils'
// ** Chat App Component Imports
import Chat from './Chat'
import Sidebar from './SidebarLeft'
import UserProfileSidebar from './UserProfileSidebar'

// ** Third Party Components
import classnames from 'classnames'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, getChatContacts, hideLoader } from './store'

import '@styles/base/pages/app-chat.scss'
import '@styles/base/pages/app-chat-list.scss'
import "@styles/react/libs/spinner/spinner.scss"

const AppChat = () => {
  const reduxUserData = useSelector((state) => getReduxUserData(state))
  const store = useSelector(state => state.chatData)

  // ** Store Vars
  const dispatch = useDispatch()

  // ** States
  const [user, setUser] = useState({})
  const [sidebar, setSidebar] = useState(false)
  const [userSidebarRight, setUserSidebarRight] = useState(false)
  const [userSidebarLeft, setUserSidebarLeft] = useState(false)

  // ** Sidebar & overlay toggle functions
  const handleSidebar = () => setSidebar(!sidebar)
  const handleUserSidebarLeft = () => setUserSidebarLeft(!userSidebarLeft)
  const handleUserSidebarRight = () => setUserSidebarRight(!userSidebarRight)
  const handleOverlayClick = () => {
    setSidebar(false)
    setUserSidebarRight(false)
    setUserSidebarLeft(false)
  }

  // ** Set user function for Right Sidebar
  const handleUser = obj => setUser(obj)

// ** Get data on Mount
useEffect(() => {
  const fetchData = async () => {
    try {
      await Promise.all([
        dispatch(getChatContacts()).unwrap(),
        dispatch(getUserProfile(reduxUserData.id)).unwrap()
      ])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      dispatch(hideLoader())
    }
  }
  fetchData()
}, [dispatch, reduxUserData.id])


  return (
    <Fragment>
        {store.isLoading ? (
        <div id="loading-overlay" style={{ display: "flex" }}>
          <div className="loader"></div>
        </div>
      ) : (
        <>
       
      <Sidebar
        store={store}
        sidebar={sidebar}
        handleSidebar={handleSidebar}
        userSidebarLeft={userSidebarLeft}
        handleUserSidebarLeft={handleUserSidebarLeft}
       
      />
      <div className='content-right'>
        <div className='content-wrapper'>
          <div className='content-body'>
            <div
              className={classnames('body-content-overlay', {
                show: userSidebarRight === true || sidebar === true || userSidebarLeft === true
              })}
              onClick={handleOverlayClick}
            ></div>
            <Chat
              store={store}
              handleUser={handleUser}
              handleSidebar={handleSidebar}
              userSidebarLeft={userSidebarLeft}
              handleUserSidebarRight={handleUserSidebarRight}
            />
            <UserProfileSidebar
              user={user}
              userSidebarRight={userSidebarRight}
              handleUserSidebarRight={handleUserSidebarRight}
            />
          </div>
        </div>
      </div>
      </>
      )}
    </Fragment>
  )
}

export default AppChat
