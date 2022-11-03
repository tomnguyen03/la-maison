import { createAsyncThunk } from '@reduxjs/toolkit'
import { payloadCreator } from 'src/utils/helper'
import cafeApi from 'src/api/cafe.api'
import commentApi from 'src/api/comment.api'

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

export const createComment = createAsyncThunk(
  'createComment',
  payloadCreator(commentApi.createComment)
)

export const getListComment = createAsyncThunk(
  'getListComment',
  payloadCreator(commentApi.getListComment)
)

export const createLikeComment = createAsyncThunk(
  'createLikeComment',
  payloadCreator(commentApi.createLikeComment)
)

export const deleteLikeComment = createAsyncThunk(
  'deleteLikeComment',
  payloadCreator(commentApi.deleteLikeComment)
)

export const createDislikeComment = createAsyncThunk(
  'createDislikeComment',
  payloadCreator(commentApi.createDislikeComment)
)

export const deleteDislikeComment = createAsyncThunk(
  'deleteDislikeComment',
  payloadCreator(commentApi.deleteDislikeComment)
)
