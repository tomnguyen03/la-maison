import React from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom'

import { path } from 'src/constants/path'
import Login from 'src/pages/Login/Login'
import UnAuthenticatedGuard from 'src/guards/UnAuthenticatedGuard'
import AuthLayout from './layouts/AuthLayout'
import AuthenticatedGuard from './guards/AuthenticatedGuard'
import Home from './pages/Home/Home'
import AdminLayout from './layouts/AdminLayout'
import User from './pages/User/User'
import Cafe from './pages/Cafe/Cafe'
import Maps from './pages/Maps/Maps'
import StaffLayout from './layouts/StaffLayout'
import Suggest from './pages/Suggest/Suggest'
import { useSelector } from 'react-redux'
import lodash from 'lodash'
import NotFound from './pages/NotFound/NotFound'

export default function RoutesComponent() {
  const profile = useSelector(state => state.auth.profile)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route element={<UnAuthenticatedGuard />}>
          <Route element={<AuthLayout />}>
            <Route path={path.login} element={<Login />} />
          </Route>
        </Route>

        <Route element={<AuthenticatedGuard />}>
          {!lodash.isEmpty(profile) &&
          profile.roleId.name === 'admin' ? (
            <Route
              path={path.home}
              element={<Navigate to="/admin/" />}
            />
          ) : (
            <Route
              path={path.home}
              element={<Navigate to="/staff/" />}
            />
          )}

          {!lodash.isEmpty(profile) &&
            profile.roleId.name === 'admin' && (
              <Route element={<AdminLayout />}>
                <Route
                  path={'/admin' + path.home}
                  element={<Navigate to="/admin/dashboard" />}
                />
                <Route
                  path={'/admin' + path.dashboard}
                  element={<Home />}
                />
                <Route
                  path={'/admin' + path.users}
                  element={<User />}
                />
                <Route
                  path={'/admin' + path.cafe}
                  element={<Cafe />}
                />
                <Route
                  path={'/admin' + path.maps}
                  element={<Maps />}
                />
              </Route>
            )}

          <Route element={<StaffLayout />}>
            <Route
              path={'/staff' + path.home}
              element={<Navigate to="/staff/suggest-list" />}
            />
            <Route
              path={'/staff' + path.suggest}
              element={<Suggest />}
            />
            <Route
              path={'/staff' + path.createCafe}
              element={<User />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
