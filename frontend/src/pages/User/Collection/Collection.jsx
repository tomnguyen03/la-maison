import React, { useState } from 'react'
import CreateCollection from './CreateCollection'
import ListCollection from './ListCollection'

export default function Collection() {
  const [showModal, setShowModal] = useState(false)

  const callbackShowModal = () => {
    setShowModal(false)
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center py-[15px] border-b border-grey-d9 mb-6">
        <div className="text-xl font-bold">Bộ sưu tập</div>
        <div
          className="text-sm flex items-center justify-center gap-1 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <i className="bx bx-plus-circle text-red-dd text-xl"></i>
          Bộ sưu tập mới
        </div>
      </div>
      <div>
        <ListCollection />
      </div>

      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <CreateCollection closeModal={callbackShowModal} />
          </div>
        </>
      ) : null}
    </div>
  )
}
