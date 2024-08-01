import { configureStore } from '@reduxjs/toolkit'
import animeReducer from './anime'
import authReducer from './auth'

export default configureStore({
  reducer: {
    anime: animeReducer,
    auth: authReducer,
  },
})
