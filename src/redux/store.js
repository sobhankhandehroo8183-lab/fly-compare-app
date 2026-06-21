import { configureStore } from '@reduxjs/toolkit'
import flightSearchReducer from './slices/flightSearchSlice'

export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
  },
})

export default store