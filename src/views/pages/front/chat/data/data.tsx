import { resolvePath } from "react-router-dom";
import sanctumService from "../../../../../@core/auth/sanctum/sanctumService";
// import moment  from 'moment';
const sanctum = new sanctumService();

export const fetchUsers = async (user_id) => {
  try {
    const responseuser = await sanctum.getUserDataForChat(user_id);
    // console.log(responseuser.data)
    return responseuser.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchChatContacts = async () => {
    try {
      const response = await sanctum.getChatContacts();
        //console.log("selectUser", response.data)
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  export const getChat = async (uniqueId) => {
    try {
      const responseChat = await sanctum.getChat(uniqueId);
       
     //responseChat.data.chat.unseenMsgs = responseChat.data.chat.unseenMsgs === 0 ? 0 : 0;
     //console.log("getChat response : ",responseChat.data)
      return responseChat.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };


  export const getMoreMsgs = async (chat_id, oldestMessageId) => {
    try {
      // console.log("getMoreMsgs  : ",chat_id, oldestMsgId)
      const getMoreMsgs = await sanctum.getMoreMsgs(chat_id, oldestMessageId);
      // responseChat.data.chat.unseenMsgs = responseChat.data.chat.unseenMsgs === 0 ? 0 : 0;
      // console.log("getChat response : ",responseChat.data)
      return getMoreMsgs.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };


  export const sendChatMsg = async (obj) => {
    try {
      //  console.log("obj",obj)
      const responseChat = await sanctum.sendMsg(obj);
    //   responseChat.data.chat.unseenMsgs = responseChat.data.chat.unseenMsgs === 0 ? 0 : 0;
       console.log("response of sendChatMSG :",responseChat.data)
      return responseChat.data;
      
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
