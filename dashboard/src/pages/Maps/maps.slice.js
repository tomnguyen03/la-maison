import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import statisticalApi from '../../api/statistical.api'

export const getListLocation = createAsyncThunk(
  'getListLocation',
  payloadCreator(statisticalApi.getListLocation)
)
