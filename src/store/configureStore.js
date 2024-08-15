import { configureStore } from '@reduxjs/toolkit'
import animeReducer from './anime'
import charactersReducer from './characters'
import authReducer from './auth'
import animeListReducer from './animeList'

export default configureStore({
  reducer: {
    anime: animeReducer,
    characters: charactersReducer,
    auth: authReducer,
    animeList: animeListReducer
  },
})
