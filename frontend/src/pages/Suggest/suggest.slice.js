import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import suggestApi from 'src/api/suggest.api'

export const createSuggest = createAsyncThunk(
  'createSuggest',
  payloadCreator(suggestApi.createSuggest)
)
