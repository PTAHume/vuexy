import { createSlice } from "@reduxjs/toolkit"

export const dealsSlice = createSlice({
  name: "dealsSlice",
  initialState: {
    deliveryType: null,
    departureDate: null,
    arrivalDate: null,
    departureCountry: null,
    departureCity: null,
    arrivalCountry: null,
    arrivalCity: null,
    departureAirport: null,
    arrivalAirport: null,
    departure_country_id: null,
    departure_city_id: null,
    arrival_country_id: null,
    departure_airport_id: null,
    arrival_city_id: null,
    arrival_airport_id: null,
    weight: null,
    isLoading: true
  },
  reducers: {
    setDeliveryType: (state, action) => {
      state.deliveryType = action.payload
    },
    setDepartureDate: (state, action) => {
      state.departureDate = action.payload
    },
    setArrivalDate: (state, action) => {
      state.arrivalDate = action.payload
    },
    setDepartureCountry: (state, action) => {
      state.departureCountry = action.payload
    },
    setDepartureCity: (state, action) => {
      state.departureCity = action.payload
    },
    setArrivalCountry: (state, action) => {
      state.arrivalCountry = action.payload
    },
    setArrivalCity: (state, action) => {
      state.arrivalCity = action.payload
    },
    setDepartureAirport: (state, action) => {
      state.departureAirport = action.payload
    },
    setArrivalAirport: (state, action) => {
      state.arrivalAirport = action.payload
    },
    setDepartureCountryId: (state, action) => {
      state.departure_country_id = action.payload
    },
    setDepartureAirportId: (state, action) => {
      state.departure_airport_id = action.payload
    },
    setArrivalAirportId: (state, action) => {
      state.arrival_airport_id = action.payload
    },
    setDepartureCityId: (state, action) => {
      state.departure_city_id = action.payload
    },
    setArrivalCountryId: (state, action) => {
      state.arrival_country_id = action.payload
    },
    setArrivalCityId: (state, action) => {
      state.arrival_city_id = action.payload
    },
    setWeight: (state, action) => {
      state.weight = action.payload
    },
    showLoader: (state) => {
      state.isLoading = true
    },
    hideLoader: (state) => {
      state.isLoading = false
    },
    dealDataSucceeded: (state) => {
      state.deliveryType = null
      state.departureDate = null
      state.arrivalDate = null
      state.departureCountry = null
      state.departureCity = null
      state.arrivalCountry = null
      state.arrivalCity = null
      state.departureAirport = null
      state.arrivalAirport = null
      state.departure_country_id = null
      state.departure_airport_id = null
      state.arrival_airport_id = null
      state.departure_city_id = null
      state.arrival_country_id = null
      state.arrival_city_id = null
      state.weight = null
    }
  }
})

export const {
  setDeliveryType,
  setDepartureDate,
  setArrivalDate,
  setDepartureCountry,
  setDepartureCountryId,
  setDepartureCityId,
  setArrivalCountryId,
  setArrivalCityId,
  setDepartureCity,
  getDepartureCity,
  setArrivalCountry,
  setArrivalCity,
  setDepartureAirport,
  setDepartureAirportId,
  setArrivalAirportId,
  setArrivalAirport,
  setWeight,
  showLoader,
  hideLoader,
  dealDataSucceeded
} = dealsSlice.actions


export default dealsSlice.reducer
