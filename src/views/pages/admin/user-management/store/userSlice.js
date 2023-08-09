// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialUserData = { userData: {} };

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: initialUserData,
    version: 0,
    loading: false,
  },

  reducers: {
    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload;
      if (state.userData[userId]) {
        state.userData[userId].status = status;
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    fetchuserDataStart: (state) => {
      state.loading = true;
    },

    fetchuserDataSuccess: (state, action) => {
      const userData = Array.isArray(action.payload) ? action.payload[0] : action.payload;
      const { id } = userData;
      state.userData[id] = userData;
      state.version += 1;
      state.loading = false;
    },
    setDataVersion: (state, action) => {
      state.dataVersion = action.payload;
    },
  },
});

export const {
  updateUserStatus,
  setLoading,
  setDataVersion,
  fetchuserDataStart,
  fetchuserDataSuccess,
} = userSlice.actions;

export default userSlice.reducer;
