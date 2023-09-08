// userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialUserData = { profile: {} }

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profile: initialUserData,
    version: 0,
    loading: false
  },

  reducers: {
    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload
      if (state.profile[userId]) {
        state.profile[userId].status = status
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    fetchuserDataStart: (state) => {
      state.loading = true
    },

    fetchuserDataSuccess: (state, action) => {
      const profile = Array.isArray(action.payload) ? action.payload[0] : action.payload
      //const { id } = userData
      state.profile = profile
      state.version += 1
      state.loading = false
    },
    setDataVersion: (state, action) => {
      state.dataVersion = action.payload
    }
  }
})

export const {
  updateUserStatus,
  setLoading,
  setDataVersion,
  fetchuserDataStart,
  fetchuserDataSuccess
} = userProfileSlice.actions

export default userProfileSlice.reducer
