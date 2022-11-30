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

export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UnAuthenticatedGuard />}>
          <Route element={<AuthLayout />}>
            <Route path={path.login} element={<Login />} />
          </Route>
        </Route>

        <Route element={<AuthenticatedGuard />}>
          <Route element={<AdminLayout />}>
            <Route
              path={path.home}
              element={<Navigate to="/dashboard" />}
            />
            <Route path={path.dashboard} element={<Home />} />
            <Route path={path.users} element={<User />} />
            <Route path={path.cafe} element={<Cafe />} />
            <Route path={path.maps} element={<Maps />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
