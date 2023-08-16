import sanctumService from "../../../../../@core/auth/sanctum/sanctumService"
const sanctum = new sanctumService()

export const fetchUsers = async (user_id) => {
  try {
    const userResponse = await sanctum.getUserDataForChat(user_id)
    // console.log(userResponse.data)
    return userResponse.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchChatContacts = async () => {
  try {
    const response = await sanctum.getChatContacts()
    //console.log("selectUser", response.data)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getChat = async (uniqueId) => {
  try {
    const responseChat = await sanctum.getChat(uniqueId)
    return responseChat.data
  } catch (error) {
    console.error(error)
    return []
  }
}


export const getMoreMsgs = async (chat_id, oldestMessageId) => {
  try {
    const getMoreMsgs = await sanctum.getMoreMsgs(chat_id, oldestMessageId)
    return getMoreMsgs.data
  } catch (error) {
    console.error(error)
    return []
  }
}


export const sendChatMsg = async (obj) => {
  try {
    const responseChat = await sanctum.sendMsg(obj)
    console.log("response of sendChatMSG :", responseChat.data)
    return responseChat.data
  } catch (error) {
    console.error(error)
    return []
  }
}

