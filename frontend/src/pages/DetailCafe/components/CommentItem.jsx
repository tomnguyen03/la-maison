import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  createDislikeComment,
  createLikeComment,
  deleteDislikeComment,
  deleteLikeComment
} from '../detailCafe.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import Timestamp from 'react-timestamp'

export default function CommentItem(props) {
  const {
    id,
    image,
    name,
    content,
    likeCount,
    dislikeCount,
    isLike,
    isDislike,
    isShowModal,
    createdAt
  } = props
  const dispatch = useDispatch()
  const authenticated = useAuthenticated()
  const [like, setLike] = useState(likeCount)
  const [dislike, setDislike] = useState(dislikeCount)
  const [hasLike, setHasLike] = useState(isLike)
  const [hasDislike, setHasDislike] = useState(isDislike)

  const handleClickLike = async () => {
    try {
      if (authenticated) {
        await dispatch(createLikeComment(id)).then(unwrapResult)
        setLike(like + 1)
        setHasLike(true)
      } else isShowModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickRemoveLike = async () => {
    try {
      if (authenticated) {
        await dispatch(deleteLikeComment(id)).then(unwrapResult)
        setLike(like - 1)
        setHasLike(false)
      } else isShowModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickDislike = async () => {
    try {
      if (authenticated) {
        await dispatch(createDislikeComment(id)).then(unwrapResult)
        setDislike(dislike + 1)
        setHasDislike(true)
      } else isShowModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickRemoveDislike = async () => {
    try {
      if (authenticated) {
        await dispatch(deleteDislikeComment(id)).then(unwrapResult)
        setDislike(dislike - 1)
        setHasDislike(false)
      } else isShowModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center gap-2 px-[20px] py-[10px] w-full">
      <img
        src={
          image ||
          'https://nld.mediacdn.vn/291774122806476800/2022/3/19/20200403104047-41cb-16476717856591379514951.jpg'
        }
        alt="Background auth"
        className="w-10 h-10 rounded-full bg-center bg-no-repeat bg-cover object-cover"
      />
      <div className="text-sm flex flex-col gap-1 bg-[#edeeef] py-2 px-3 rounded-xl flex-1">
        <h6 className="font-montserrat font-semibold">{name}</h6>
        <p className="">{content}</p>
        <div className="flex gap-8 text-grey-7 text-sm">
          {hasLike ? (
            <p
              className="cursor-pointer text-red-dd font-medium"
              onClick={handleClickRemoveLike}
            >
              {like} Thích
            </p>
          ) : (
            <p className="cursor-pointer " onClick={handleClickLike}>
              {like} Thích
            </p>
          )}
          {hasDislike ? (
            <p
              className="cursor-pointer text-red-dd font-medium"
              onClick={handleClickRemoveDislike}
            >
              {dislike} Không Thích
            </p>
          ) : (
            <p
              className="cursor-pointer "
              onClick={handleClickDislike}
            >
              {dislike} Không Thích
            </p>
          )}
          <p>{<Timestamp relative date={createdAt} autoUpdate />}</p>
        </div>
      </div>
    </div>
  )
}
