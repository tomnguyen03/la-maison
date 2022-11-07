import React from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { createBookmark } from '../detailCafe.slice'

export default function ChooseCollection({
  collections,
  closeModal,
  cafeId,
  bookmarkTrue,
  isBookmark
}) {
  const dispatch = useDispatch()

  const handleClickSaveBookmark = async collectionId => {
    try {
      const data = {
        cafeId: cafeId,
        collectionId: collectionId
      }
      if (!isBookmark) {
        await dispatch(createBookmark(data)).then(unwrapResult)
        bookmarkTrue()
        closeModal()
        toast.success('Lưu Bookmark thành công', {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: true
        })
      } else return
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {!isBookmark ? (
        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={closeModal}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="flex relative w-full max-w-xl mx-auto bg-white rounded-lg shadow-lg flex-col p-7">
              <div className="mb-4">Chọn bộ sưu tập</div>
              <div className="grid grid-cols-2 p-3">
                {collections.map((item, index) => (
                  <div
                    className="flex items-center gap-3 p-4 cursor-pointer rounded hover:bg-red-f8"
                    key={index}
                    onClick={() => handleClickSaveBookmark(item._id)}
                  >
                    <div className="text-2xl text-red-ac">
                      <i className="bx bxs-folder"></i>
                    </div>
                    <div className="line-clamp-1">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
