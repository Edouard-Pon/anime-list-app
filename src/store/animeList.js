import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/api.js'
import { getUserId } from '../utils/authUtils'

export const fetchAnimeList = createAsyncThunk('animeList/fetchAnimeList', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token
  const userId = getUserId(getState().auth.user)

  try {
    const response = await api.get(`/anime-list/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const addAnimeToFavorites = createAsyncThunk('animeList/addAnimeToFavorites', async (animeId = '', { getState, rejectWithValue }) => {
  const token = getState().auth.token
  const userId = getUserId(getState().auth.user)

  try {
    const response = await api.post(`/anime-list/${userId}/favorites`, { animeId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const removeAnimeFromFavorites = createAsyncThunk('animeList/removeAnimeFromFavorites', async (animeId = '', { getState, rejectWithValue }) => {
  const token = getState().auth.token
  const userId = getUserId(getState().auth.user)

  try {
    const response = await api.delete(`/anime-list/${userId}/favorites/${animeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const addAnimeToWatched = createAsyncThunk('animeList/addAnimeToWatched', async (animeId = '', { getState, rejectWithValue }) => {
  const token = getState().auth.token
  const userId = getUserId(getState().auth.user)

  try {
    const response = await api.post(`/anime-list/${userId}/watched`, { animeId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const removeAnimeFromWatched = createAsyncThunk('animeList/removeAnimeFromWatched', async (animeId = '', { getState, rejectWithValue }) => {
  const token = getState().auth.token
  const userId = getUserId(getState().auth.user)

  try {
    const response = await api.delete(`/anime-list/${userId}/watched/${animeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const addAnimeToToWatch = createAsyncThunk('animeList/addAnimeToToWatch', async (animeId = '', { getState, rejectWithValue }) => {
  const token = getState().auth.token
  const userId = getUserId(getState().auth.user)

  try {
    const response = await api.post(`/anime-list/${userId}/toWatch`, { animeId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const removeAnimeFromToWatch = createAsyncThunk('animeList/removeAnimeFromToWatch', async (animeId = '', { getState, rejectWithValue }) => {
  const token = getState().auth.token
  const userId = getUserId(getState().auth.user)

  try {
    const response = await api.delete(`/anime-list/${userId}/toWatch/${animeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const addAnimeToAbandoned = createAsyncThunk('animeList/addAnimeToAbandoned', async (animeId = '', { getState, rejectWithValue }) => {
  const token = getState().auth.token
  const userId = getUserId(getState().auth.user)

  try {
    const response = await api.post(`/anime-list/${userId}/abandoned`, { animeId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const removeAnimeFromAbandoned = createAsyncThunk('animeList/removeAnimeFromAbandoned', async (animeId = '', { getState, rejectWithValue }) => {
  const token = getState().auth.token
  const userId = getUserId(getState().auth.user)

  try {
    const response = await api.delete(`/anime-list/${userId}/abandoned/${animeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const addAnimeToWatching = createAsyncThunk('animeList/addAnimeToWatching', async (animeId = '', { getState, rejectWithValue }) => {
  const token = getState().auth.token
  const userId = getUserId(getState().auth.user)

  try {
    const response = await api.post(`/anime-list/${userId}/watching`, { animeId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const removeAnimeFromWatching = createAsyncThunk('animeList/removeAnimeFromWatching', async (animeId = '', { getState, rejectWithValue }) => {
  const token = getState().auth.token
  const userId = getUserId(getState().auth.user)

  try {
    const response = await api.delete(`/anime-list/${userId}/watching/${animeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const animeListSlice = createSlice({
  name: 'animeList',
  initialState: {
    animeList: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAnimeList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.animeList = action.payload
      })
      .addCase(fetchAnimeList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || action.error.message
      })
      .addCase(addAnimeToFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.animeList = action.payload.animeList
      })
      .addCase(addAnimeToFavorites.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addAnimeToFavorites.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || action.error.message
      })
      .addCase(removeAnimeFromFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.animeList = action.payload.animeList
      })
      .addCase(removeAnimeFromFavorites.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeAnimeFromFavorites.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || action.error.message
      })
      .addCase(addAnimeToWatched.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.animeList = action.payload.animeList
      })
      .addCase(addAnimeToToWatch.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.animeList = action.payload.animeList
      })
      .addCase(addAnimeToAbandoned.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.animeList = action.payload.animeList
      })
      .addCase(addAnimeToWatching.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.animeList = action.payload.animeList
      })
  }
})

export default animeListSlice.reducer
