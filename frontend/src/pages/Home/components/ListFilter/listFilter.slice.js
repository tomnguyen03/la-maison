import { createAsyncThunk } from '@reduxjs/toolkit'
import listFilterApi from 'src/api/listFilter.api'
import { payloadCreator } from 'src/utils/helper'

export const getStyle = createAsyncThunk(
  'styles/get',
  payloadCreator(listFilterApi.getStyle)
)
export const getVibe = createAsyncThunk(
  'vibes/get',
  payloadCreator(listFilterApi.getVibes)
)
