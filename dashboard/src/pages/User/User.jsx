import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CardTable from './CardTable'
import { getAllUsers } from '../../components/Headers/statistical.slice'
import { updateActive } from '../Login/auth.slice'

export default function User() {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(getAllUsers())
      .then(unwrapResult)
      .then(res => setData(res.data))
  }, [dispatch])

  const handleChange = async (event, id) => {
    const data = {
      id: id,
      isActive: event.target.checked
    }
    try {
      await dispatch(updateActive(data)).then(unwrapResult)
      await dispatch(getAllUsers())
        .then(unwrapResult)
        .then(res => setData(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateRole = async () => {
    try {
      await dispatch(getAllUsers())
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
        handleChange={handleChange}
        handleUpdateRole={handleUpdateRole}
      />
    </div>
  )
}
