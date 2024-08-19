import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/api'
import { buildCharacterFormData } from '../utils/characterUtils'

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async ({ rejectWithValue }) => {
  try {
    const response = await api.get('/character')
    return response.data.character
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const fetchCharacterById = createAsyncThunk('characters/fetchCharacterById', async (id = '', { rejectWithValue }) => {
  try {
    const response = await api.get(`/character/${id}`)
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const searchCharacters = createAsyncThunk('characters/searchCharacters', async (query = {}, { rejectWithValue }) => {
  try {
    const response = await api({
      method: 'post',
      url: '/character/search',
      data: {
        name: query.name
      }
    })

    return response.data.character
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const addCharacter = createAsyncThunk('characters/addCharacter', async (character = {}, { getState, rejectWithValue }) => {
  const token = getState().auth.token

  const formData = buildCharacterFormData(character)

  try {
    const response = await api({
      method: 'post',
      url: '/character/create',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })

    return response.data.character
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const updateCharacter = createAsyncThunk('characters/updateCharacter', async (character = {}, { getState, rejectWithValue }) => {
  const token = getState().auth.token

  const formData = buildCharacterFormData(character)

  try {
    const response = await api({
      method: 'put',
      url: `/character/${character.id}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })

    return response.data.character
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const deleteCharacter = createAsyncThunk('characters/deleteCharacter', async (id = '', { getState, rejectWithValue }) => {
  const token = getState().auth.token

  try {
    const response = await api({
      method: 'delete',
      url: `/character/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: [],
    selectedCharacter: {},
    status: 'idle',
    selectedStatus: 'idle',
    uploadStatus: 'idle',
    updateStatus: 'idle',
    deleteStatus: 'idle',
    searchStatus: 'idle',
    error: null
  },
  reducers: {
    resetError: (state) => {
      state.error = null
    },
    resetSelectedStatus: (state) => {
      state.selectedStatus = 'idle'
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = 'idle'
    },
    resetSearchStatus: (state) => {
      state.searchStatus = 'idle'
    },
    resetUploadStatus: (state) => {
      state.uploadStatus = 'idle'
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle'
    },
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
      .addCase(fetchCharacterById.pending, (state) => {
        state.selectedStatus = 'loading'
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.selectedStatus = 'succeeded'
        state.selectedCharacter = action.payload.character
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.selectedStatus = 'failed'
        state.error = action.payload?.message || action.error.message
      })
      .addCase(deleteCharacter.pending, (state) => {
        state.deleteStatus = 'loading'
      })
      .addCase(deleteCharacter.fulfilled, (state) => {
        state.deleteStatus = 'succeeded'
      })
      .addCase(deleteCharacter.rejected, (state, action) => {
        state.deleteStatus = 'failed'
        state.error = action.payload?.message || action.error.message
      })
      .addCase(searchCharacters.pending, (state) => {
        state.searchStatus = 'loading'
      })
      .addCase(searchCharacters.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded'
        state.characters = action.payload
      })
      .addCase(searchCharacters.rejected, (state, action) => {
        state.searchStatus = 'failed'
        state.error = action.payload?.message || action.error.message
      })
      .addCase(addCharacter.pending, (state) => {
        state.uploadStatus = 'loading'
      })
      .addCase(addCharacter.fulfilled, (state, action) => {
        state.uploadStatus = 'succeeded'
        state.characters.push(action.payload)
      })
      .addCase(addCharacter.rejected, (state, action) => {
        state.uploadStatus = 'failed'
        state.error = action.payload?.message || action.error.message
      })
      .addCase(updateCharacter.pending, (state) => {
        state.uploadStatus = 'loading'
      })
      .addCase(updateCharacter.fulfilled, (state, action) => {
        state.uploadStatus = 'succeeded'
        state.selectedCharacter = action.payload
      })
      .addCase(updateCharacter.rejected, (state, action) => {
        state.uploadStatus = 'failed'
        state.error = action.payload?.message || action.error.message
      })
  }
})

export const {
  resetError,
  resetSelectedStatus,
  resetDeleteStatus,
  resetSearchStatus,
  resetUploadStatus,
  resetUpdateStatus,
} = charactersSlice.actions
export default charactersSlice.reducer
