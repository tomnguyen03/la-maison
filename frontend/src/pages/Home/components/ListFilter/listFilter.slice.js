import { createAsyncThunk } from '@reduxjs/toolkit'
import listFilterApi from 'src/api/listFilter.api'
import { payloadCreator } from 'src/utils/helper'
import addressApi from 'src/api/address.api'

export const getStyle = createAsyncThunk(
  'styles/get',
  payloadCreator(listFilterApi.getStyle)
)
export const getVibe = createAsyncThunk(
  'vibes/get',
  payloadCreator(listFilterApi.getVibes)
)
export const getProvinceByName = createAsyncThunk(
  'getProvinceByName',
  payloadCreator(addressApi.getProvinceByName)
)

export const getDistrictsByProvince = createAsyncThunk(
  'getDistrictsByProvince',
  payloadCreator(addressApi.getDistrictByProvince)
)
