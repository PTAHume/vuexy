// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUsers, fetchChatContacts, getChat, sendChatMsg, getMoreMsgs } from '../data/data';



export const getUserProfile = createAsyncThunk(
  "appChat/getTasks",
  async (id) => {
    const response = fetchUsers(id);
   
    return response;
  }
);

export const getChatContacts = createAsyncThunk(
  'appChat/getChatContacts',
  async () => {
    const response = fetchChatContacts();
    //console.log(response)
    return response;
  }
);

export const selectChat = createAsyncThunk(
  'appChat/selectChat', async (uniqueId, { dispatch }) => {
   // console.log("cagirdi !!!!")
    const response = getChat(uniqueId);
    //await dispatch(getChatContacts())
    return response;
  });


  export const loadMoreMsgs = createAsyncThunk(
    'appChat/loadMoreMsgs',
    async ({ chatId, oldestMessageId }) => {
      const response = getMoreMsgs(chatId, oldestMessageId);
      return response;
    }
  );
  


export const sendMsg = createAsyncThunk(
  'appChat/sendMsg', 
  async (obj, { dispatch }) => {
    try {
      console.log("Send Message reducer:",obj)
      dispatch(setTemporaryMessageId(obj.message.id)); // Assume storeOldMessageId is an action that saves oldId in the state
      const response = await sendChatMsg(obj);
      // const newMessageId = response.newMessageData.message_id; // Get the new message ID from the response
      // const newTime = response.newMessageData.time;
      // const newTimeDate = new Date(newTime.replace(' ', 'T'));
      // const formattedDate = `${newTimeDate.getDate()} ${newTimeDate.toLocaleString('default', { month: 'long' })}, ${newTimeDate.getFullYear()}`;

      // dispatch(updateMessageId({ oldId: obj.message.id, newId: newMessageId, NewTime:newTime  })); 
      // await dispatch(getChatContacts())
      
      // dispatch(updateMessageStatus({ messageId: newMessageId, status: formattedDate }));

       return response;
    } catch (error) {
      dispatch(updateMessageStatus({ messageId: obj.message.id, status: '!Error : Message was not sent' }));
      throw error;
    }
  }
);

  

export const updateChatListWithWebsocket = createAsyncThunk(
  'appChat/updateChatListWithWebsocket', 
  async (data, { dispatch, getState }) => { // Include getState here
    try {
      const newMessageId = data.newMessageData.message_id;
      const newTime = data.newMessageData.time;
      const newTimeDate = new Date(newTime.replace(' ', 'T'));
      const formattedDate = `${newTimeDate.getDate()} ${newTimeDate.toLocaleString('default', { month: 'long' })}, ${newTimeDate.getFullYear()}`;

      //DONT FORGET IF THERE IS AN ERROR IN THE LINE THE LINES AFTER THIS WILL NOT BE PROCESSED!
      await dispatch(getChatContacts())

      const tempId = getState().chatData.temporaryMessageId; // Get oldId from the state
      // Conditional dispatch
      if (tempId) {
        
        dispatch(updateMessageId({ oldId: tempId, newId: newMessageId, NewTime: newTime })); 
        dispatch(updateMessageStatus({ messageId: newMessageId, status: formattedDate }));
        //console.log('temp: ', tempId)
      }

      //return data;
    } catch (error) {
      dispatch(updateMessageStatus({ messageId: data.message.id, status: '!Error : Message was not updated' }));
      throw error;
    }
  }
);






export const appChatSlice = createSlice({
  name: 'appChat',
  initialState: {
    chats: [],
    contacts: [],
    userProfile: {},
    selectedUser: [],
    isLoading: true, // Add this line
    isLoadingMoreMsg : false,
    oldestMessageId : null,  //the first message id in the message set. important to get the another set of message older than this
    newMessageId  : null,
    selectedChatUniqueId  : null,
    temporaryMessageId : null,

  },
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
    setTemporaryMessageId: (state, action) => {
      state.temporaryMessageId = action.payload;
    },

    showLoaderMoreMsg: (state) => {
      state.isLoadingMoreMsg = true;
    },
    hideLoaderMoreMsg: (state) => {
      state.isLoadingMoreMsg = false;
    },
    setOldestMessageId: (state, action) => {
      state.oldestMessageId = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateMessageId: (state, action) => {
      const { oldId, newId , NewTime} = action.payload;
      const chat = state.selectedUser.find(chat => chat.id === state.selectedChatUniqueId);
      const message = chat.data.chat.chat.find(m => m.id === oldId);
      if (message) {
        message.id = newId;
        message.time = NewTime;
      }
    },
    updateMessageStatus: (state, action) => {
      const { messageId, status } = action.payload;
      const chat = state.selectedUser.find(chat => chat.id === state.selectedChatUniqueId);
      const message = chat.data.chat.chat.find(m => m.id === messageId);
      if (message) {
        message.status = status;
      }
    },
    setSelectedChatUniqueId: (state, action) => {
      state.selectedChatUniqueId = action.payload;
    },
  },
 
  extraReducers: builder => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload
        // console.log(state.userProfile)
      })
      .addCase(getChatContacts.fulfilled, (state, action) => {
        state.chats = action.payload.chatsContacts
        // console.log(action.payload.chatsContacts)
         state.contacts = action.payload.contacts
      })
      .addCase(selectChat.fulfilled, (state, action) => {
        let existingChat = state.selectedUser.find(chat => chat.id === action.payload.chat.unique_id);
        if (existingChat) {
          existingChat.data = action.payload;
        } else {
          state.selectedUser.push({
            id: action.payload.chat.unique_id,
            data: action.payload,
          });
        }
        state.selectedChatUniqueId = action.payload.chat.unique_id; // Add this line
        state.oldestMessageId = null; // Reset the oldestMessageId here
      })

      .addCase(loadMoreMsgs.fulfilled, (state, action) => {
        // Find the correct chat in the selectedUser array
        const chat = state.selectedUser.find(chat => chat.id === state.selectedChatUniqueId);
        if (chat && chat.data && chat.data.chat && chat.data.chat.chat) {
          // Prepend the new messages to the correct chat
          chat.data.chat.chat.unshift(...action.payload.messages);
          state.oldestMessageId = action.payload.firstMsgId;
        }
      })

      // .addCase(sendMsg.fulfilled, (state, action) => {
      //   // Find the correct chat in the selectedUser array
      //   let existingChat = state.selectedUser.find(chat => chat.id === action.payload.chat.unique_id);
      //   if (existingChat) {
      //     existingChat.data = action.payload;
      //   } else {
      //     state.selectedUser.push({
      //       id: action.payload.chat.unique_id,
      //       data: action.payload,
      //     });
      //   }
      // });
      
   
  }
})
export const { showLoader, hideLoader, showLoaderMoreMsg, hideLoaderMoreMsg, setOldestMessageId, setSelectedUser, updateMessageId, updateMessageStatus, setSelectedChatUniqueId, setTemporaryMessageId     } = appChatSlice.actions; // Export actions
export default appChatSlice.reducer
