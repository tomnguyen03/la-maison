import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import collectionApi from 'src/api/collection.api'

export const createCollection = createAsyncThunk(
  'CreateCollection',
  payloadCreator(collectionApi.createCollection)
)

export const getCollection = createAsyncThunk(
  'getCollection',
  payloadCreator(collectionApi.getCollection)
)
