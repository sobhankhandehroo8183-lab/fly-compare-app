import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  origin: '',
  destination: '',
  departureDate: '',
  returnDate: '',
  adults: 1,
  children: 0,
  cabinClass: 'economy',
  isLoading: false,
  results: [],
  error: null,
}

const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      return { ...state, ...action.payload }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setResults: (state, action) => {
      state.results = action.payload
      state.isLoading = false
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearResults: (state) => {
      state.results = []
      state.error = null
    },
  },
})

export const { setSearchParams, setLoading, setResults, setError, clearResults } = flightSearchSlice.actions
export default flightSearchSlice.reducer