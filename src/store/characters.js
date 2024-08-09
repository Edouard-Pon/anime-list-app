import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/api'

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async ({ rejectWithValue }) => {
  try {
    const response = await api.get('/character')
    return response.data.character
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: [],
    status: 'idle',
    error: null
  },
  reducers: {
    resetError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.characters = action.payload
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.message || action.error.message
      })
  }
})

export const { resetError } = charactersSlice.actions
export default charactersSlice.reducer
