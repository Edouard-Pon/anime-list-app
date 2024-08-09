import { configureStore } from '@reduxjs/toolkit'
import animeReducer from './anime'
import charactersReducer from './characters'
import authReducer from './auth'

export default configureStore({
  reducer: {
    anime: animeReducer,
    characters: charactersReducer,
    auth: authReducer,
  },
})
