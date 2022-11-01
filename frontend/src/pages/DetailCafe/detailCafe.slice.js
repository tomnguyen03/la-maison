import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import cafeApi from 'src/api/cafe.api'

export const getDetailCafe = createAsyncThunk(
  'getListCafe',
  payloadCreator(cafeApi.getDetailCafe)
)

export const getLikeCafe = createAsyncThunk(
  'getLikeCafe',
  payloadCreator(cafeApi.getLikeCafe)
)

export const createLikeCafe = createAsyncThunk(
  'createLikeCafe',
  payloadCreator(cafeApi.createLikeCafe)
)

export const deleteLikeCafe = createAsyncThunk(
  'deleteLikeCafe',
  payloadCreator(cafeApi.deleteLikeCafe)
)
