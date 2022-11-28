import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import addressApi from 'src/api/address.api'
import cafeApi from 'src/api/cafe.api'
import countApi from 'src/api/count.api'

export const getAllProvince = createAsyncThunk(
  'getProvinceByName',
  payloadCreator(addressApi.getAllProvince)
)

export const getDistrictsByProvince = createAsyncThunk(
  'getDistrictsByProvince',
  payloadCreator(addressApi.getDistrictByProvince)
)

export const getWardsByDistrict = createAsyncThunk(
  'getWardsByDistrict',
  payloadCreator(addressApi.getWardByDistrict)
)

export const createCafe = createAsyncThunk(
  'createCafe',
  payloadCreator(cafeApi.createCafe)
)

export const getListCafe = createAsyncThunk(
  'getListCafe',
  payloadCreator(cafeApi.getCafe)
)

export const getListCafeByCollection = createAsyncThunk(
  'getListCafeByCollection',
  payloadCreator(cafeApi.getListCafeByCollection)
)

export const updateCount = createAsyncThunk(
  'updateCount',
  payloadCreator(countApi.updateCount)
)
