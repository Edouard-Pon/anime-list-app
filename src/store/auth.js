import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/api.js'

export const login = createAsyncThunk('auth/login', async (credentials = {}) => {
  const response = await api.post('/user/login', credentials)
  return response.data
})

export const register = createAsyncThunk('auth/register', async (credentials = {}, { rejectWithValue }) => {
  try {
    const response = await api.post('/user/register', credentials)
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  return null
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('isAuthenticated', true)
    })
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.status = 'idle'
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('isAuthenticated')
    })
    builder.addCase(register.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('isAuthenticated', true)
    })
    builder.addCase(register.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload?.message || action.error.message
    })
  }
})

export default authSlice.reducer
