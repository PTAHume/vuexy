import { createAsyncThunk } from '@reduxjs/toolkit'
import sanctumService from '@sanctum/sanctumService'
import {dealSlice} from './dealSlice'


const sanctum = new sanctumService()
export const updateDealStatus = createAsyncThunk(
  'admin/updateDealStatus',
  async ({ dealId, status }, { dispatch }) => {
    try {
      // Update the status using sanctum.updateAdminStatus()
      await sanctum.updateAdminDealStatus(dealId, status)

      // Update the Redux store with the new status
      dispatch(dealSlice.actions.updateDealStatus({ dealId, status }))

      // Return the new status
      return status
    } catch (error) {
      console.log(error)
      throw new Error('Error updating status')
    }
  }
)
