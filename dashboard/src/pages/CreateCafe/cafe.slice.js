import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import createCafeApi from 'src/api/createCafe.api'

export const getAllProvince = createAsyncThunk(
  'getProvinceByName',
  payloadCreator(createCafeApi.getAllProvince)
)

export const getDistrictsByProvince = createAsyncThunk(
  'getDistrictsByProvince',
  payloadCreator(createCafeApi.getDistrictByProvince)
)

export const getWardsByDistrict = createAsyncThunk(
  'getWardsByDistrict',
  payloadCreator(createCafeApi.getWardByDistrict)
)

export const createCafe = createAsyncThunk(
  'createCafe',
  payloadCreator(createCafeApi.createCafe)
)

export const getStyle = createAsyncThunk(
  'styles/get',
  payloadCreator(createCafeApi.getStyle)
)

export const getVibe = createAsyncThunk(
  'vibes/get',
  payloadCreator(createCafeApi.getVibes)
)
