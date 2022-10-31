import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import addressApi from 'src/api/address.api'
import cafeApi from '../../api/cafe.api'

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
