import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import CardTable from './CardTable'
import { getSuggestList, updateApproval } from './staff.slice'

export default function Suggest() {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(getSuggestList())
      .then(unwrapResult)
      .then(res => setData(res.data))
  }, [dispatch])

  const handleClickUpdateApproval = async (id, isApproval) => {
    const data = {
      id: id,
      approval: isApproval
    }

    try {
      await dispatch(updateApproval(data)).then(unwrapResult)
      await dispatch(getSuggestList())
        .then(unwrapResult)
        .then(res => setData(res.data))

      toast.success('Cập nhật thành công', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full mb-12 px-4 pb-8">
      <CardTable
        color="dark"
        data={data}
        handleClickUpdateApproval={handleClickUpdateApproval}
      />
    </div>
  )
}
