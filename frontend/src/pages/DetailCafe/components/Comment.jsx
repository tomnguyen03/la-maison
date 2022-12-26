import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import {
  createComment,
  createDislikeComment,
  createLikeComment,
  deleteDislikeComment,
  deleteLikeComment,
  getListComment
} from '../detailCafe.slice'
import CommentItem from './CommentItem'
import lodash from 'lodash'
import { Skeleton } from '@mui/material'

export default function Comment({ idCafe, isShowModal }) {
  const dispatch = useDispatch()
  const authenticated = useAuthenticated()
  const [commentValue, setCommentValue] = useState('')
  const [dataComment, setDataComment] = useState([])

  useEffect(() => {
    dispatch(getListComment(idCafe))
      .then(unwrapResult)
      .then(res => setDataComment(res.data))
  }, [dispatch, idCafe])

  const handleSubmitSearch = async event => {
    const data = {
      cafeId: idCafe,
      content: commentValue
    }
    event.preventDefault()

    try {
      if (!lodash.isEmpty(authenticated)) {
        await dispatch(createComment(data)).then(unwrapResult)

        await dispatch(getListComment(idCafe))
          .then(unwrapResult)
          .then(res => setDataComment(res.data))
      } else {
        isShowModal()
      }
    } catch (error) {
      console.log(error)
    }

    event.target.reset()
  }
  const loading = useSelector(state => state.app.loading)

  //Comment Item

  const handleClickLike = async id => {
    if (!lodash.isEmpty(authenticated)) {
      try {
        await dispatch(createLikeComment(id)).then(unwrapResult)
        await dispatch(getListComment(idCafe))
          .then(unwrapResult)
          .then(res => setDataComment(res.data))
      } catch (error) {
        console.log(error)
      }
    } else isShowModal()
  }

  const handleClickRemoveLike = async id => {
    if (!lodash.isEmpty(authenticated)) {
      try {
        await dispatch(deleteLikeComment(id)).then(unwrapResult)
        await dispatch(getListComment(idCafe))
          .then(unwrapResult)
          .then(res => setDataComment(res.data))
      } catch (error) {
        console.log(error)
      }
    } else isShowModal()
  }

  const handleClickDislike = async id => {
    if (!lodash.isEmpty(authenticated)) {
      try {
        await dispatch(createDislikeComment(id)).then(unwrapResult)
        await dispatch(getListComment(idCafe))
          .then(unwrapResult)
          .then(res => setDataComment(res.data))
      } catch (error) {
        console.log(error)
      }
    } else isShowModal()
  }

  const handleClickRemoveDislike = async id => {
    if (!lodash.isEmpty(authenticated)) {
      try {
        await dispatch(deleteDislikeComment(id)).then(unwrapResult)
        await dispatch(getListComment(idCafe))
          .then(unwrapResult)
          .then(res => setDataComment(res.data))
      } catch (error) {
        console.log(error)
      }
    } else isShowModal()
  }

  return (
    <div className="w-full rounded-md shadow-lg pt-[10px]">
      {dataComment &&
        (!loading ? (
          <div className="overflow-auto max-h-[400px]">
            {dataComment.map((item, index) => (
              <CommentItem
                id={item._id}
                name={item.accountId.name || item.accountId.email}
                image={item.accountId.avatar}
                content={item.content}
                likeCount={item.like_count}
                dislikeCount={item.dislike_count}
                isLike={item.isLike}
                isDislike={item.isDislike}
                createdAt={item.createdAt}
                handleClickLike={handleClickLike}
                handleClickRemoveLike={handleClickRemoveLike}
                handleClickDislike={handleClickDislike}
                handleClickRemoveDislike={handleClickRemoveDislike}
                key={index}
              />
            ))}
          </div>
        ) : (
          <Skeleton variant="rect" height={400} />
        ))}
      <form onSubmit={handleSubmitSearch} className="relative">
        <input
          type="text"
          className="pl-14 pr-20 w-full text-sm text-grey-3 placeholder:text-grey-7 rounded px-5 py-4 bg-grey-f5 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] focus:outline-none"
          placeholder="Thêm bình luận..."
          onChange={e => setCommentValue(e.target.value)}
        />
        <span className="absolute cursor-pointer inset-y-0 left-[10px] flex items-center">
          <i className="bx bx-user text-3xl text-grey-7"></i>
        </span>
        <button
          type="submit"
          className="absolute cursor-pointer inset-y-0 right-[20px] flex items-center text-primary-e0 font-montserrat"
        >
          Đăng
        </button>
      </form>
    </div>
  )
}
