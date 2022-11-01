import React, { useEffect, useState } from 'react'
import CafeItem from './CafeItem'
import { useDispatch } from 'react-redux'
import { getListCafe } from '../../../Cafe/cafe.slice'
import { unwrapResult } from '@reduxjs/toolkit'

export default function ListCafe() {
  const dispatch = useDispatch()

  const [listCafe, setListCafe] = useState([])
  useEffect(() => {
    dispatch(getListCafe())
      .then(unwrapResult)
      .then(res => setListCafe(res.data))
  }, [dispatch])

  return (
    <div className="grid grid-cols-3 gap-8">
      {listCafe.map((item, index) => (
        <CafeItem
          id={item._id}
          name={item.name}
          address={item.detail_address}
          image={item.images[0]}
          key={index}
        />
      ))}
    </div>
  )
}
