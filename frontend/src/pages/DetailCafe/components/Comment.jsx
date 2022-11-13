import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import { createComment, getListComment } from '../detailCafe.slice'
import CommentItem from './CommentItem'
import lodash from 'lodash'

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

  return (
    <div className="w-full rounded-md shadow-lg pt-[10px]">
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
            isShowModal={isShowModal}
            createdAt={item.createdAt}
            key={index}
          />
        ))}
      </div>
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
