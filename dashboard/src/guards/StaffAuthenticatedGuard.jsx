import React, { Fragment } from 'react'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from 'src/constants/path'
import lodash from 'lodash'

export default function AuthenticatedGuard() {
  const authenticated = useAuthenticated()
  if (authenticated.roleId.name === 'staff')
    return <Navigate to={path.login} />

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}
