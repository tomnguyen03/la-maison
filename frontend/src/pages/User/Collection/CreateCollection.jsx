import React, { useState } from 'react'

export default function CreateCollection({ closeModal }) {
  const [collectionName, setCollectionName] = useState('')

  const handleClickCreateCollection = () => {
    console.log(collectionName)
    closeModal()
  }

  return (
    <div className="flex items-center min-h-screen px-4 py-8">
      <div className="flex relative w-full max-w-xl mx-auto bg-white rounded-lg shadow-lg flex-col p-7">
        <div className="mb-4">Tạo bộ sưu tập mới</div>
        <div className="flex gap-3">
          <input
            type="text"
            className="w-full text-sm text-grey-3 placeholder:text-grey-7 rounded px-5 py-2 bg-white border border-grey-3 focus:outline-none focus:border-red-ee focus:ring-red-ee focus:ring-1"
            placeholder="Tên bộ sưu tập?"
            onChange={e => setCollectionName(e.target.value)}
          />
          <button
            className="px-5 py-2 rounded text-white bg-primary-e0 text-sm"
            onClick={handleClickCreateCollection}
          >
            Tạo
          </button>
        </div>
      </div>
    </div>
  )
}
