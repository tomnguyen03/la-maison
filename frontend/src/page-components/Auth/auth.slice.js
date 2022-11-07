import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'src/api/auth.api'
import { payloadCreator } from 'src/utils/helper'
import LocalStorage from 'src/constants/localStorage'

export const register = createAsyncThunk(
  'auth/register',
  payloadCreator(authApi.register)
)
export const login = createAsyncThunk(
  'auth/login',
  payloadCreator(authApi.login)
)

const handleAuthFulfilled = (state, action) => {
  const { token, refreshToken, ...other } = action.payload.data
  state.profile = other
  localStorage.setItem(
    LocalStorage.PROFILE,
    JSON.stringify(state.profile)
  )
  localStorage.setItem(LocalStorage.ACCESS_TOKEN, 'Bearer ' + token)
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    profile:
      JSON.parse(localStorage.getItem(LocalStorage.PROFILE)) || {}
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(LocalStorage.PROFILE)
      localStorage.removeItem(LocalStorage.ACCESS_TOKEN)
      state.profile = {}
    }
  },
  extraReducers: {
    [register.fulfilled]: handleAuthFulfilled,
    [login.fulfilled]: handleAuthFulfilled
  }
})

const { actions, reducer } = authSlice
export const { logout } = actions
export default reducer
