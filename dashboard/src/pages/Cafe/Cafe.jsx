import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CardTable from './CardTable'
import { getAllCafe } from 'src/components/Headers/statistical.slice'

export default function Cafe() {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(getAllCafe())
      .then(unwrapResult)
      .then(res => setData(res.data))
  }, [dispatch])

  return (
    <div className="w-full mb-12 px-4 pb-8">
      <CardTable color="dark" data={data} />
    </div>
  )
}
