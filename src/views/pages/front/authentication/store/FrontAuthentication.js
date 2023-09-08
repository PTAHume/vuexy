// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
import useSanctum from '@src/auth/sanctum/useSanctum'

const config = useSanctum.sanctumConfig

const initialUser = () => {
  const item = window.localStorage.getItem('frontUserData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
  name: 'frontauthentication',
  initialState: {
    frontUserData: initialUser()

  },
  reducers: {
    handleFrontLogin: (state, action) => {
      state.frontUserData = action.payload
      state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
      localStorage.setItem('frontUserData', JSON.stringify(action?.payload ?? []))
      localStorage.setItem(config.storageTokenKeyName, JSON.stringify(action?.payload?.accessToken ?? []))
      localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(action?.payload?.refreshToken ?? []))
    },
    handleFrontLogout: (state) => {
      state.frontUserData = {}
      state[config.storageTokenKeyName] = null
      state[config.storageRefreshTokenKeyName] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('frontUserData')
      localStorage.removeItem(config.storageTokenKeyName)
      localStorage.removeItem(config.storageRefreshTokenKeyName)
    },
    //lets update the status.
    updateUserStatus: (state, action) => {
      state.frontUserData.online_status = action.payload
      localStorage.setItem('frontUserData', JSON.stringify(state?.frontUserData ?? []))
    }
  }
})

export const { handleFrontLogin, handleFrontLogout, updateUserStatus } = authSlice.actions

export default authSlice.reducer
