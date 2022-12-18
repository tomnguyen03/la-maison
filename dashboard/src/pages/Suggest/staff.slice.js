import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import staffApi from 'src/api/staff.api'

export const getSuggestList = createAsyncThunk(
  'getSuggestList',
  payloadCreator(staffApi.getSuggestList)
)

export const updateApproval = createAsyncThunk(
  'updateApproval',
  payloadCreator(staffApi.updateApproval)
)
