import { createAsyncThunk } from '@reduxjs/toolkit'
import sanctumService from '@sanctum/sanctumService'
import {editDealsSlice} from '.'


const sanctum = new sanctumService()
export const updateDealStatus = createAsyncThunk(
  'front/updateMyDealStatus',
  async ({ dealId, status }, { dispatch }) => {
    try {
      // Update the status using sanctum.updateAdminStatus()
      await sanctum.updateUserDealStatus(dealId, status)

      // Update the Redux store with the new status
      dispatch(editDealsSlice.actions.updateDealStatus({ dealId, status }))

      // Return the new status
      return status
    } catch (error) {
      console.log(error)
      throw new Error('Error updating status')
    }
  }
)
