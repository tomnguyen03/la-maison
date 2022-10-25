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
  const { email, token } = action.payload.data
  state.email = email
  localStorage.setItem(
    LocalStorage.EMAIL,
    JSON.stringify(state.email)
  )
  localStorage.setItem(LocalStorage.ACCESS_TOKEN, 'Bearer ' + token)
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: JSON.parse(localStorage.getItem(LocalStorage.EMAIL)) || {}
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(LocalStorage.EMAIL)
      localStorage.removeItem(LocalStorage.ACCESS_TOKEN)
      state.email = {}
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
