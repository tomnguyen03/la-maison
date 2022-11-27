import React, { Fragment } from 'react'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from 'src/constants/path'

export default function UnauthenticatedGuard() {
  const authenticated = useAuthenticated()

  if (authenticated) return <Navigate to={path.home} />
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}
