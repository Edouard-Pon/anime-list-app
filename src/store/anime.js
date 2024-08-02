import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/api'
import { buildAnimeFormData } from '../utils/animeUtils.js';

export const fetchAnime = createAsyncThunk('anime/fetchAnime', async () => {
  const response = await api.get('/anime')
  return response.data.anime
})

export const addAnime = createAsyncThunk('anime/addAnime', async (anime = {}, { getState }) => {
  const token = getState().auth.token

  const formData = buildAnimeFormData(anime)

  const response = await api({
    method: 'post',
    url: '/anime/create',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  })

  return response.data.anime
})

export const animeSlice = createSlice({
  name: 'anime',
  initialState: {
    anime: [],
    status: 'idle',
    uploadStatus: 'idle',
    error: null,
  },
  reducers: {
    resetUploadStatus: (state) => {
      state.uploadStatus = 'idle'
    }
  },
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
    builder.addCase(addAnime.pending, (state) => {
      state.uploadStatus = 'loading'
    })
    builder.addCase(addAnime.fulfilled, (state, action) => {
      state.uploadStatus = 'succeeded'
      state.anime.push(action.payload)
    })
    builder.addCase(addAnime.rejected, (state, action) => {
      state.uploadStatus = 'failed'
      state.error = action.error.message
    })
  }
})

export const { resetUploadStatus } = animeSlice.actions
export default animeSlice.reducer
