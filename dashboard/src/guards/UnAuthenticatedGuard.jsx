import React, { Fragment } from 'react'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from 'src/constants/path'
import lodash from 'lodash'

export default function UnauthenticatedGuard() {
  const authenticated = useAuthenticated()

  if (!lodash.isEmpty(authenticated))
    return <Navigate to={path.home} />
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}
