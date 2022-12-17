import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CardTable from './CardTable'
import {
  getAllCafe,
  updateActiveCafe
} from 'src/components/Headers/statistical.slice'

export default function Cafe() {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(getAllCafe())
      .then(unwrapResult)
      .then(res => setData(res.data))
  }, [dispatch])

  const handleUpdateCafe = async (id, isActive) => {
    const data = {
      id: id,
      isActive: isActive
    }

    try {
      await dispatch(updateActiveCafe(data)).then(unwrapResult)
      await dispatch(getAllCafe())
        .then(unwrapResult)
        .then(res => setData(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full mb-12 px-4 pb-8">
      <CardTable
        color="dark"
        data={data}
        handleUpdateCafe={handleUpdateCafe}
      />
    </div>
  )
}
