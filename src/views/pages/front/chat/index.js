// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { getReduxUserData } from "../../../../utility/Utils";
// ** Chat App Component Imports
import Chat from './Chat'
import Sidebar from './SidebarLeft'
import UserProfileSidebar from './UserProfileSidebar'

// ** Third Party Components
import classnames from 'classnames'
import { showLoader, hideLoader, updateChatListWithWebsocket } from './store';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, getChatContacts } from './store'

// import { useSubscribeToAllChatsList  } from './Subscription/subscribe-channel/subscribeToAllChatsList.js';
// import Pusher from 'pusher-js';
import '@styles/base/pages/app-chat.scss'
import '@styles/base/pages/app-chat-list.scss'
import "@styles/react/libs/spinner/spinner.scss";
const AppChat = () => {
  //const isLoading = useSelector((state) => state.appChat.isLoading);
  const state = useSelector((state) => state);
  const reduxUserData = getReduxUserData(state);
  // console.log(state)

  const store = useSelector(state => state.chatData)
  //console.log("store index page",store)

  // ** Store Vars
  const dispatch = useDispatch()
  // const reduxUserData = useSelector(state => state.getReduxUserData);

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
        dispatch(getUserProfile(reduxUserData.id)).unwrap(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(hideLoader());
    }
  };

  fetchData();
}, [dispatch, reduxUserData.id]);


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
