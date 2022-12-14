import React, { useEffect, useState } from 'react'
import CollectionItem from './CollectionItem'
import { useDispatch } from 'react-redux'
import { getCollection } from './collection.slice'
import { unwrapResult } from '@reduxjs/toolkit'

export default function ListCollection() {
  const dispatch = useDispatch()
  const [listCollection, setListCollection] = useState([])

  useEffect(() => {
    const _getCollection = async () => {
      const res = await dispatch(getCollection())
      const data = unwrapResult(res)
      setListCollection(data.data)
    }

    _getCollection()
  }, [dispatch])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {listCollection.map((item, index) => (
        <CollectionItem
          name={item.name}
          images={item.images}
          id={item._id}
          key={index}
        />
      ))}
    </div>
  )
}
