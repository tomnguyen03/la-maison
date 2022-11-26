import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import cafeApi from 'src/api/cafe.api'

export const getListLocation = createAsyncThunk(
  'getProvinceByName',
  payloadCreator(cafeApi.getListLocation)
)
