import { createSlice } from '@reduxjs/toolkit';


const initialDealData = { dealData: {} };

export const dealSlice = createSlice({
  name: 'deal',
  initialState: {
    dealData: {},
    loading: true,
    version: 0,
    dataVersion: 0, // Add this line
    countries: [],
    cities: [],
    airports: [],
    loadingCountries: true, // Add this line
    loadingCities: true, // Add this line
    loadingAirports: true, // Add this line
  },

  reducers: {
    updateDealStatus: (state, action) => {
      const { dealId, status } = action.payload;
      if (state.dealData[dealId]) {
        state.dealData[dealId].status = status;
      }
    },

    setLoadingDeal: (state, action) => {
      state.loading = action.payload;
    },

    fetchDealDataStart: (state) => {
      state.loading = true;
    },

    fetchDealDataSuccess: (state, action) => {
      //console.log('Reducer called: fetchDealDataSuccess', action.payload);
      const dealData = Array.isArray(action.payload) ? action.payload[0] : action.payload;
      const { id } = dealData;
      state.dealData[id] = dealData;
      state.version += 1;
      state.loading = false;
  
    },
    setDealDataVersion: (state, action) => {
      state.dataVersion = action.payload;
      
    },

    setReduxCountries: (state, action) => {
      state.countries = action.payload;
      state.loadingCountries = false; // Add this line
    },
    setReduxCities: (state, action) => {
      state.cities = action.payload;
      state.loadingCities = false; // Add this line
    },
    setReduxAirports: (state, action) => {
      state.airports = action.payload;
      state.loadingAirports = false; // Add this line
    },
  },
});

export const {
  updateDealStatus,
  setLoadingDeal,
  setDealDataVersion,
  fetchDealDataStart,
  fetchDealDataSuccess,
  setReduxCountries,
  setReduxCities,
  setReduxAirports,
} = dealSlice.actions;

export default dealSlice.reducer;
