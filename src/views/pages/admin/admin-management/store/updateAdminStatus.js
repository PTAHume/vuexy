import { createAsyncThunk } from '@reduxjs/toolkit'
import sanctumService from '../../../../../@core/auth/sanctum/sanctumService'
import {adminSlice} from './adminSlice'


const sanctum = new sanctumService()
export const updateAdminStatus = createAsyncThunk(
  'admin/updateAdminStatus',
  async ({ adminId, status }, { dispatch }) => {
    try {
      // Update the status using sanctum.updateAdminStatus()
      await sanctum.updateAdminStatus(adminId, status)

      // Update the Redux store with the new status
      dispatch(adminSlice.actions.updateAdminStatus({ adminId, status }))

      // Return the new status
      return status
    } catch (error) {
      console.log(error)
      throw new Error('Error updating status')
    }
  }
)
