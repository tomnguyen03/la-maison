import React from 'react'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core'

export default function Loading() {
  const loading = useSelector(state => state.app.loading)
  if (loading)
    return (
      <div className="fixed w-full h-full flex items-center justify-center bg-black opacity-40">
        <CircularProgress color="secondary" />
      </div>
    )
  return null
}
