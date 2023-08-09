// ** React Imports
import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import { baseURL } from "../../../../utility/Utils";
// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import {
  sendMsg,
  loadMoreMsgs,
  showLoaderMoreMsg,
  hideLoaderMoreMsg,
  setSelectedUser,
  updateChatListWithWebsocket
} from "./store";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  MessageSquare,
  Menu,
  PhoneCall,
  Video,
  Search,
  MoreVertical,
  Mic,
  Image,
  Send,
} from "react-feather";

// ** Reactstrap Imports
import {
  Form,
  Label,
  Input,
  Button,
  InputGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupText,
  UncontrolledDropdown,
} from "reactstrap";

import { useSubscribeToAllChatsList  } from './Subscription/subscribe-channel/subscribeToAllChatsList.js';
import Pusher from 'pusher-js';
import toast from 'react-hot-toast';


const ChatLog = (props) => {
  // ** Props & Store
  const {
    handleUser,
    handleUserSidebarRight,
    handleSidebar,
    store,
    userSidebarLeft,
  } = props;
  const { userProfile, selectedUser, selectedChatUniqueId } = store;

  // ** Refs & Dispatch
  const chatArea = useRef(null);
  const dispatch = useDispatch();
  // ** State
  const [msg, setMsg] = useState("");

  //lets get the skin 
  const skin = localStorage.getItem('skin');
//console.log(skin)
  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current);
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER;
  };

  
// let's assume selectedChatUniqueId is the unique id you are searching for.
const selectedUserObject = selectedUser.find(
    (user) => user.id === selectedChatUniqueId
);

//console.log(store)
const chat_id = selectedUserObject?.data?.chat?.id; //chat id of selected chat
const savedOldestMessage = store.oldestMessageId; //this is the redux saved oldest message id of fetched message set
const firstFetchOldestMessage = selectedUserObject?.data?.contact?.chat?.firstMessage; // this is the oldest message id of first load


// useEffect(() => {
//   console.log("selectedUserObject state in useEffect: ", selectedUserObject);
// }, [selectedUserObject]);


const handleWebSocketError = (error) => {
  // Your error handling code here
  if (error.response && error.response.status === 401) {
    //sanctum.refreshToken()
  }
};

const handleWebSocketSuccess = (status) => {
  // Your success handling code here
   // console.log("success", status);
};

const onDataReceived = async (data) => {
  // console.log("ondataReceived in onDataReceived: ", data.chats)
  dispatch(updateChatListWithWebsocket(data &&  data.chats));
  
  const newMsg = {
    id: data.chats.newMessageData.message_id,
    chat_id: data.chats.id,
    message: data.chats.newMessageData.message,
    time: data.chats.newMessageData.time,
    sender_id: data.chats.newMessageData.senderId,
    //status: formattedDate,
  };
//  console.log("newMsg onDataReceived: ", newMsg)
//console.log("sss: ", selectedUser)
await dispatch(
  setSelectedUser(
    selectedUser.map(chat => 
      chat.data.chat.unique_id === selectedChatUniqueId
        ? {
            ...chat,
            data: {
              ...chat.data,
              chat: {
                ...chat.data.chat,
                chat: [...chat.data.chat.chat, newMsg],
              },
            },
          }
        : chat
  ))
);


};
//   //lets listen the channel if something changes we reflect this
  useSubscribeToAllChatsList(handleWebSocketError, handleWebSocketSuccess, onDataReceived);


  useEffect(() => {
    console.log("selectedUser state in onDataReceived: ", selectedUser); // Check if useEffect runs after state update
  }, [selectedUser]);





  const getMoreMsgs = async () => {
    try {
      await dispatch(showLoaderMoreMsg());
      await dispatch(
        loadMoreMsgs({
          chatId: chat_id,
          oldestMessageId: savedOldestMessage
            ? savedOldestMessage
            : firstFetchOldestMessage || null,
        })
      );
    } catch (error) {
      console.error("Error in loadMoreMsgs:", error);
    } finally {
      dispatch(hideLoaderMoreMsg());
    }
  };

  // ** If user chat is not empty scrollToBottom
  useEffect(() => {
    const selectedUserLen = selectedUserObject && Object.keys(selectedUserObject).length;

    if (selectedUserLen) {
      scrollToBottom();
    }
  }, [selectedUserObject]);

  // ** Formats chat data based on sender
  const formattedChatData = () => {

    let chatLog = [];
    if (selectedUserObject.data.chat) {
      chatLog = selectedUserObject.data.chat?.chat;
      // console.log("chatLog:",chatLog)
    }

    const formattedChatLog = [];
    let chatMessageSenderId = chatLog[0] ? chatLog[0].sender_id : undefined;
    let msgGroup = {
      sender_id: chatMessageSenderId,
      messages: [],
    };
    //console.log("catlog: " , chatLog )
    chatLog.forEach((msg, index) => {
      if (chatMessageSenderId === msg.sender_id) {
        msgGroup.messages.push({
          msg: msg.message,
          time: msg.time,
          id: msg.id,
          status: msg.status,
        });
      } else {
        chatMessageSenderId = msg.sender_id;
        formattedChatLog.push(msgGroup);
        msgGroup = {
          sender_id: msg.sender_id,
          messages: [
            {
              msg: msg.message,
              time: msg.time,
              id: msg.id,
              status: msg.status,
            },
          ],
        };
      }
      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup);
    });
    return formattedChatLog;
  };

  // ** Renders user chat
  // ** Renders user chat
  const renderChats = () => {
    //console.log("test!!!: ")
    return formattedChatData().map((item, index) => {
    //  console.log("item_sender_id: ", item)
      // console.log("userProfile.id: ", userProfile.id)
      // console.log("selectedUser.contact.avatar: ", selectedUser.contact.avatar)
      // console.log("userProfile.image: ", userProfile.image)
      // console.log("selectedUser: ", selectedUser)
      return (
        <div
          key={`${item.sender_id}-${item.messages[0].id}`}
          className={classnames("chat", {
            "chat-left": item.sender_id !== userProfile.id,
          })}
        >
          <div className="chat-avatar">
            <Avatar
              imgWidth={36}
              imgHeight={36}
              className="box-shadow-1 cursor-pointer"
              img={
                item.sender_id !== userProfile.id
                  ? `${baseURL}/${selectedUserObject.data.contact.avatar}` // opponent
                  : `${baseURL}/${userProfile.image}`
              }
            />
          </div>

          <div className="chat-body">
            {item.messages.map((chat) => {
             // console.log(chat)
              // Create a new Date object
              const date = new Date(chat.time);

              // Format the date
              const formattedDate = `${date.getDate()} ${date.toLocaleString(
                "default",
                { month: "long" }
              )}, ${date.getFullYear()}`;

              return (
                <div key={chat.id} className="chat-content">
                  <p>{chat.msg}</p>
                  <small
                    style={{
                      fontSize: "8px",
                      color: skin === '"dark"' ? "#fefe" : "#000",
                      fontStyle: "italic",
                    }}
                  >
                    {/* Conditional rendering for the status and time */}
                    {chat.status ?? formattedDate}
                  </small>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  // ** Opens right sidebar & handles its data
  const handleAvatarClick = (obj) => {
    handleUserSidebarRight();
    handleUser(obj);
  };

  // ** On mobile screen open left sidebar on Start Conversation Click
  const handleStartConversation = () => {
    if (
      !Object.keys(selectedUserObject).length &&
      !userSidebarLeft &&
      window.innerWidth < 992
    ) {
      handleSidebar();
    }
  };

  // ** Sends New Msg
  const handleSendMsg = async (e) => {
    const min = -1;
    const max = -100;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    e.preventDefault();
    if (msg.trim().length) {
      const newDate = new Date();
      const formattedDate = `${newDate.getDate()} ${newDate.toLocaleString(
        "default",
        { month: "long" }
      )}, ${newDate.getFullYear()}`;
      const newMsg = {
        id: randomInt,
        chat_id: selectedUserObject.data.chat.id,
        message: msg,
        time: newDate.toISOString(),
        sender_id: userProfile.id,
        status: formattedDate,
      };
      //console.log("SendMsg newMsg: ", newMsg)
      const selectedChat = selectedUser.find(chat => chat.data.chat.unique_id === selectedChatUniqueId);
  
      if(selectedChat) {
        await dispatch(sendMsg({ ...selectedChat, message: newMsg }));
       // console.log("SelectedUser in handleSendMsg: ", selectedChat)
       await dispatch(
        setSelectedUser(
          selectedUser.map(chat => 
            chat.data.chat.unique_id === selectedChatUniqueId
              ? {
                  ...chat,
                  data: {
                    ...chat.data,
                    chat: {
                      ...chat.data.chat,
                      chat: [...chat.data.chat.chat, newMsg],
                    },
                  },
                }
              : chat
        ))
      );
    
     
      
      }
      //console.log("SelectedUser in handleSendMsg end of the function: ", selectedUser)
      setMsg("");
    }
  };
 // console.log("selectedUser state: ", selectedUser); // Check the current state

  // useEffect(() => {
  //   console.log("selectedUser state in useEffect: ", selectedUser); // Check if useEffect runs after state update
  // }, [selectedUser]);
  
  //console.log("Render"); // Check each re-render
  

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper =
  selectedUserObject && Object.keys(selectedUserObject).length && selectedUserObject?.data?.chat
    ? PerfectScrollbar
    : "div";



  return (
    <div className="chat-app-window">
    <div
        className={classnames("start-chat-area", {
          "d-none": selectedUserObject && Object.keys(selectedUserObject).length,
        })}
      >

        <div className="start-chat-icon mb-1">
          <MessageSquare />
        </div>
        <h4
          className="sidebar-toggle start-chat-text"
          onClick={handleStartConversation}
        >
          Start Conversation
        </h4>
      </div>
      {selectedUserObject && Object.keys(selectedUserObject).length ? (
        <div
          className={classnames("active-chat", {
            "d-none": selectedUserObject === null,
          })}
        >
          <div className="chat-navbar">
            <header className="chat-header">
              <div className="d-flex align-items-center">
                <div
                  className="sidebar-toggle d-block d-lg-none me-1"
                  onClick={handleSidebar}
                >
                  <Menu size={21} />
                </div>
                <Avatar
                  imgHeight="36"
                  imgWidth="36"
                  img={`${baseURL}/${selectedUserObject.data.contact.avatar}`}
                  status={selectedUserObject.data.contact.status}
                  className="avatar-border user-profile-toggle m-0 me-1"
                  onClick={() => handleAvatarClick(selectedUserObject.data.contact)}
                />
                <h6 className="mb-0">{selectedUserObject.data.contact.fullName}</h6>
              </div>
              <div className="d-flex align-items-center">
                {/* <PhoneCall size={18} className='cursor-pointer d-sm-block d-none me-1' />
                <Video size={18} className='cursor-pointer d-sm-block d-none me-1' /> */}
                <Search
                  size={18}
                  className="cursor-pointer d-sm-block d-none"
                />
                <UncontrolledDropdown className="more-options-dropdown">
                  <DropdownToggle
                    className="btn-icon"
                    color="transparent"
                    size="sm"
                  >
                    <MoreVertical size="18" />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      View Contact
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Mute Notifications
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Block Contact
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Clear Chat
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Report
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </header>
          </div>

          <ChatWrapper
            ref={chatArea}
            className="user-chats"
            options={{ wheelPropagation: false }}
          >
            <Button
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              onClick={() => getMoreMsgs()}
              disabled={savedOldestMessage === "FINISHED"} // Disable button if savedOldestMessage equals "FINISHED"
            >
              {savedOldestMessage === "FINISHED"
                ? "No more messages"
                : "Load More Messages"}
            </Button>

            {store.isLoadingMoreMsg ? (
              <div id="loading-overlay" style={{ display: "flex" }}>
                <div className="loader"></div>
              </div>
            ) : selectedUserObject.data.chat ? (
              <div className="chats">{renderChats()}</div>
            ) : null}
          </ChatWrapper>

          <Form className="chat-app-form" onSubmit={(e) => handleSendMsg(e)}>
            <InputGroup className="input-group-merge me-1 form-send-message">
              <Input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your message or use speech to text"
              />
              <InputGroupText>
                <Label className="attachment-icon mb-0" for="attach-doc">
                  <Image className="cursor-pointer text-secondary" size={14} />
                  <input type="file" id="attach-doc" hidden />
                </Label>
              </InputGroupText>
            </InputGroup>
            <Button className="send" color="primary">
              <Send size={14} className="d-lg-none" />
              <span className="d-none d-lg-block">Send</span>
            </Button>
          </Form>
        </div>
      ) : null}
    </div>
  );
};

export default ChatLog;
