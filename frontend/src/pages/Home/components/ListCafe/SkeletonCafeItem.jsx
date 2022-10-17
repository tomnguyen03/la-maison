import React from 'react'
import { Skeleton } from '@material-ui/lab'

export default function SkeletonCafeItem() {
  return (
    <div className="flex flex-col">
      <Skeleton variant="rect" width={400} height={400} />
      <div className="mt-4">
        <Skeleton variant="text" width={300} height={24} />
      </div>
      <div className="mt-2">
        <Skeleton variant="text" width={150} height={20} />
      </div>
    </div>
  )
}
