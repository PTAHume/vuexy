import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import data, { getFilteredProducts } from "../../data/data"

export const getProducts = createAsyncThunk(
  "Offers/getOffers",
  async (params) => {
    const filteredProducts = getFilteredProducts(params)
    return filteredProducts
  }
)


export const offersSlice = createSlice({
  name: "offersSlice",
  initialState: {
    params: {
      perPage: 9,
      q: "",
      sortBy: "featured",
      page: 1,
      minPrice: null,
      maxPrice: null,
      delivery_type: null,
      departure_date: null,
      arrival_date: null,
      arrival_airport: null,
      arrival_city: null,
      arrival_country: null,
      departure_airport: null,
      departure_city: null,
      departure_country: null,
      weight: null
    },
    products: data.products,
    totalProducts: data.products?.length,
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
    pages: {}, // Change this line
    isLoading: true, // Add this line
    sortedProducts: {} // Add this line
  },
  reducers: {
    setPages: (state, action) => {
      const { page, data } = action.payload
      state.pages = {
        ...state.pages,
        [page]: data
      }
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
    updateParams: (state, action) => {
      state.params = action.payload
    },
    showLoader: (state) => {
      state.isLoading = true
    },
    hideLoader: (state) => {
      state.isLoading = false
    },
    clearPages: (state) => {
      state.pages = {}
    },
    clearSortedProducts: (state) => {
      state.sortedProducts = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      const sortBy = action.payload.params.sortBy
      state.sortedProducts[sortBy] = action.payload.products
      state.params = action.payload.params
      state.pages[action.payload.params.page] = action.payload.products
      state.totalProducts = action.payload.total
    })
  }
})

export const {
  setDepartureCountry,
  setDepartureCountryId,
  setDepartureCityId,
  setArrivalCountryId,
  setArrivalCityId,
  setDepartureCity,
  setArrivalCountry,
  setArrivalCity,
  setDepartureAirport,
  setDepartureAirportId,
  setArrivalAirportId,
  setArrivalAirport,
  setWeight,
  showLoader,
  hideLoader,
  setPages,
  updateParams,
  clearPages,
  clearSortedProducts
} = offersSlice.actions


export default offersSlice.reducer
