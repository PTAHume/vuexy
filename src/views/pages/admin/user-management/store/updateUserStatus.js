import { createAsyncThunk } from '@reduxjs/toolkit'
import sanctumService from '@sanctum/sanctumService'
import {userSlice} from './userSlice'


const sanctum = new sanctumService()
export const updateUserStatus = createAsyncThunk(
  'user/updateUserStatus',
  async ({ userId, status }, { dispatch }) => {
    try {
      // Update the status using sanctum.updateuserStatus()
      await sanctum.updateAdminStatus(userId, status)

      // Update the Redux store with the new status
      dispatch(userSlice.actions.updateUserStatus({ userId, status }))

      // Return the new status
      return status
    } catch (error) {
      console.log(error)
      throw new Error('Error updating status')
    }
  }
)
