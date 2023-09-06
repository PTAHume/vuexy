// ** React Imports
import { useState, useEffect } from 'react'
import { baseURL } from '../../../../utility/Utils'
// ** Custom Components
import Avatar from '@components/avatar'
import {
  showLoader, hideLoader,
  selectChat, setOldestMessageId, setSelectedChatUniqueId
} from './store'
import { useDispatch } from 'react-redux'
import { formatDateToMonthShort } from '@utils'
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { X, Search, Bell, Trash } from 'react-feather'
import { CardText, InputGroup, InputGroupText, Badge, Input } from 'reactstrap'

const SidebarLeft = props => {
  // ** Props & Store
  const { store, sidebar, handleSidebar, userSidebarLeft, handleUserSidebarLeft } = props
  const { chats, contacts, userProfile } = store
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState({ chatId: null, userId: null, uniqueId: null })
  const [filteredChat, setFilteredChat] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  // ** Handles User Chat Click
  const handleUserClick = async (uniqueId) => {
    const selectedItem = chats.find((chatItem) => chatItem.unique_id === uniqueId)
    // Find the correct chat from the selectedUser array.
    const selectedChat = store.selectedUser.find(userChat => userChat.data.chat.id === selectedItem.chat?.id)
    if (!selectedChat || selectedChat.data.chat.id !== selectedItem.chat?.id) {
      try {
        window.localStorage.setItem("EnableSendMessage", JSON.stringify(true))
        await dispatch(showLoader())
        await dispatch(selectChat(selectedItem?.unique_id))
        await dispatch(setSelectedChatUniqueId(selectedItem?.unique_id))
        await dispatch(setOldestMessageId(null))
      } catch (error) {
        console.error('Error in handleUserClick:', error)
      } finally {
        dispatch(hideLoader())
      }
    } else {
      setActive({
        chatId: selectedChat.data.chat.id,
        userId: selectedChat.data.contact.id,
        uniqueId: selectedChat.id
      })
      await dispatch(setSelectedChatUniqueId(selectedItem?.unique_id))

    }

    if (sidebar === true) {
      handleSidebar()
    }
  }

  useEffect(() => {
    if (!isEmpty(store.selectedUser)) {
      // Find the correct chat from the selectedUser array.
      const selectedChat = store.selectedUser.find(userChat => userChat.data.chat.unique_id === store.selectedChatUniqueId)
      if (selectedChat) {
        setActive({
          chatId: selectedChat.data.chat?.id,
          userId: selectedChat.data.contact?.id,
          uniqueId: selectedChat.data.chat?.unique_id
        })
      }
    }
  }, [store.selectedUser, store.selectedChatUniqueId])

  const renderChats = () => {
    if (chats && chats.length) {
      if (query.length && !filteredChat.length) {
        return (
          <li className='no-results show'>
            <h6 className='mb-0'>No Chats Found</h6>
          </li>
        )
      } else {
        const arrToMap = query.length && filteredChat.length ? filteredChat : chats

        return arrToMap.map(item => {
          // console.log(item.chat.id)
          const time = formatDateToMonthShort(item.chat.lastMessage ? item.chat.lastMessage.time : new Date())

          return (
            <li
              key={`${item.chat.id}_${item.id}`}
              onClick={() => handleUserClick(item.unique_id)}
              className={classnames({
                active: active.uniqueId === item.unique_id
              })}

            >
              <Avatar img={`${baseURL}/${item.avatar}`} imgHeight='42' imgWidth='42' status={item.status} />
              <div className='chat-info flex-grow-1'>
                <h5 className='mb-0'>{item.about}</h5>
                <CardText className='text-truncate'>
                  {item.chat.lastMessage ? item.chat.lastMessage.message : chats[chats.length - 1].message}
                </CardText>
              </div>
              <div className='chat-meta text-nowrap'>
                <small className='float-end mb-25 chat-time ms-25'>{time}</small>
                {item.chat.unseenMsgsForUser >= 1 && userProfile.id !== item.chat.lastMessage.senderId ? (
                  <Badge className='float-end' color='danger' pill>
                    {item.chat.unseenMsgsForUser}
                  </Badge>
                ) : null}

              </div>
            </li>
          )
        })
      }
    } else {
      return null
    }
  }

  const handleFilter = e => {
    setQuery(e.target.value)
    const searchFilterFunction = contact => contact.fullName.toLowerCase().includes(e.target.value.toLowerCase())
    const filteredChatsArr = chats?.filter(searchFilterFunction)
    const filteredContactssArr = contacts?.filter(searchFilterFunction)

    if (Array.isArray(filteredChatsArr)) {
      setFilteredChat([...filteredChatsArr])
    } else {
      setFilteredChat([])
    }

    if (Array.isArray(filteredContactssArr)) {
      setFilteredContacts([...filteredContactssArr])
    } else {
      setFilteredContacts([])
    }
  }
  return store ? (
    <div className='sidebar-left'>
      {store.isLoading ? (
        <div id="loading-overlay" style={{ display: "flex" }}>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className='sidebar'>
            <div
              className={classnames('chat-profile-sidebar', {
                show: userSidebarLeft
              })}
            >
              <header className='chat-profile-header'>
                <div className='close-icon' onClick={handleUserSidebarLeft}>
                  <X size={14} />
                </div>
                <div className='header-profile-sidebar'>
                  <Avatar className='box-shadow-1 avatar-border'
                    img={`${baseURL}/${userProfile.image}`}
                    status={userProfile.online_status} size='xl' />
                  <h4 className='chat-user-name'>{userProfile.fullName}</h4>
                  <span className='user-post'>{userProfile.role}</span>
                </div>
              </header>
              <PerfectScrollbar className='profile-sidebar-area' options={{ wheelPropagation: false }}>
                <h6 className='section-label mb-1 mt-2'>Settings</h6>
                <ul className='list-unstyled'>

                  <li className='d-flex justify-content-between align-items-center mb-1'>
                    <div className='d-flex align-items-center'>
                      <Bell className='me-75' size='18' />
                      <span className='align-middle'>Notification</span>
                    </div>
                    <div className='form-switch'>
                      <Input type='switch' id='notifications' name='notifications' />
                    </div>
                  </li>

                  <li className='d-flex align-items-center cursor-pointer'>
                    <Trash className='me-75' size='18' />
                    <span className='align-middle'>Delete Chat</span>
                  </li>
                </ul>

              </PerfectScrollbar>
            </div>
            <div
              className={classnames('sidebar-content', {
                show: sidebar === true
              })}
            >
              <div className='sidebar-close-icon' onClick={handleSidebar}>
                <X size={14} />
              </div>
              <div className='chat-fixed-search'>
                <div className='d-flex align-items-center w-100'>
                  <div className='sidebar-profile-toggle' onClick={handleUserSidebarLeft}>
                    {Object.keys(userProfile).length ? (
                      <Avatar
                        className='avatar-border'
                        img={`${baseURL}/${userProfile.image}`}
                        status={userProfile.online_status}
                        imgHeight='42'
                        imgWidth='42'
                      />
                    ) : null}
                  </div>
                  <InputGroup className='input-group-merge ms-1 w-100'>
                    <InputGroupText className='round'>
                      <Search className='text-muted' size={14} />
                    </InputGroupText>
                    <Input
                      value={query}
                      className='round'
                      placeholder='Search or start a new chat'
                      onChange={handleFilter}
                    />
                  </InputGroup>
                </div>
              </div>
              <PerfectScrollbar className='chat-user-list-wrapper list-group' options={{ wheelPropagation: false }}>
                <h4 className='chat-list-title'>Airline Baggages</h4>
                <ul className='chat-users-list chat-list media-list'>{renderChats()}</ul>
                <h4 className='chat-list-title'>Hotels</h4>
                <ul className='chat-users-list contact-list media-list'></ul>
                <h4 className='chat-list-title'>Coupons</h4>
                <ul className='chat-users-list contact-list media-list'></ul>
              </PerfectScrollbar>
            </div>
          </div>
        </>
      )}
    </div>
  ) : null
}

export default SidebarLeft
