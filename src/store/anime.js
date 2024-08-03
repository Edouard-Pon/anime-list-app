import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/api'
import { buildAnimeFormData } from '../utils/animeUtils.js';

export const fetchAnime = createAsyncThunk('anime/fetchAnime', async () => {
  const response = await api.get('/anime')
  return response.data.anime
})

export const fetchAnimeById = createAsyncThunk('anime/fetchAnimeById', async (id = '') => {
  const response = await api.get(`/anime/${id}`)
  return response.data
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

export const deleteAnime = createAsyncThunk('anime/deleteAnime', async (id = '', { getState }) => {
  const token = getState().auth.token

  const response = await api({
    method: 'delete',
    url: `/anime/${id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response.data
})

export const animeSlice = createSlice({
  name: 'anime',
  initialState: {
    anime: [],
    selectedAnime: {},
    status: 'idle',
    selectedStatus: 'idle',
    uploadStatus: 'idle',
    deleteStatus: 'idle',
    error: null,
  },
  reducers: {
    resetUploadStatus: (state) => {
      state.uploadStatus = 'idle'
    },
    resetSelectedStatus: (state) => {
      state.selectedStatus = 'idle'
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = 'idle'
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
    builder.addCase(fetchAnimeById.pending, (state) => {
      state.selectedStatus = 'loading'
    })
    builder.addCase(fetchAnimeById.fulfilled, (state, action) => {
      state.selectedStatus = 'succeeded'
      state.selectedAnime = action.payload
    })
    builder.addCase(fetchAnimeById.rejected, (state, action) => {
      state.selectedStatus = 'failed'
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
    builder.addCase(deleteAnime.pending, (state) => {
      state.deleteStatus = 'loading'
    })
    builder.addCase(deleteAnime.fulfilled, (state, action) => {
      state.deleteStatus = 'succeeded'
      state.anime = state.anime.filter(anime => anime._id !== action.payload.id)
    })
    builder.addCase(deleteAnime.rejected, (state, action) => {
      state.deleteStatus = 'failed'
      state.error = action.error.message
    })
  }
})

export const { resetUploadStatus, resetSelectedStatus, resetDeleteStatus } = animeSlice.actions
export default animeSlice.reducer
