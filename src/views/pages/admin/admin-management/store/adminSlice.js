// adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialAdminData = { adminData: {} };

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminData: initialAdminData,
    version: 0,
    loading: false,
  },

  reducers: {
    updateAdminStatus: (state, action) => {
      const { adminId, status } = action.payload;
      if (state.adminData[adminId]) {
        state.adminData[adminId].status = status;
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    fetchAdminDataStart: (state) => {
      state.loading = true;
    },

    fetchAdminDataSuccess: (state, action) => {
      const adminData = Array.isArray(action.payload) ? action.payload[0] : action.payload;
      const { id } = adminData;
      state.adminData[id] = adminData;
      state.version += 1;
      state.loading = false;
    },
    setDataVersion: (state, action) => {
      state.dataVersion = action.payload;
    },
  },
});

export const {
  updateAdminStatus,
  setLoading,
  setDataVersion,
  fetchAdminDataStart,
  fetchAdminDataSuccess,
} = adminSlice.actions;

export default adminSlice.reducer;
