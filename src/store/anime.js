import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/api'

export const fetchAnime = createAsyncThunk('anime/fetchAnime', async () => {
  const response = await api.get('/anime')
  return response.data.anime
})

export const animeSlice = createSlice({
  name: 'anime',
  initialState: {
    anime: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAnime.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchAnime.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.anime = action.payload
    })
    builder.addCase(fetchAnime.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export default animeSlice.reducer
