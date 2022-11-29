import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import statisticalApi from 'src/api/statistical.api'

export const getCount = createAsyncThunk(
  'getCount',
  payloadCreator(statisticalApi.getCount)
)

export const getAllUsers = createAsyncThunk(
  'getAllUsers',
  payloadCreator(statisticalApi.getAllUser)
)

export const statisticalUser = createAsyncThunk(
  'statisticalUser',
  payloadCreator(statisticalApi.statisticalUser)
)

export const getAllCafe = createAsyncThunk(
  'getAllCafe',
  payloadCreator(statisticalApi.getAllCafe)
)
