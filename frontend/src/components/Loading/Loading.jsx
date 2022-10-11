import React from 'react'
import { useSelector } from 'react-redux'
import { LinearProgress } from '@material-ui/core'

export default function Loading() {
  const loading = useSelector(state => state.app.loading)
  if (loading)
    return (
      <div className="fixed top-0 left-0 right-0">
        <LinearProgress color="primary" />
      </div>
    )
  return null
}
