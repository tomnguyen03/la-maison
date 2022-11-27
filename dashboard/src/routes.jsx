import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { path } from 'src/constants/path'
import Login from 'src/pages/Login/Login'
import UnAuthenticatedGuard from 'src/guards/UnAuthenticatedGuard'
import AuthLayout from './layouts/AuthLayout'
import AuthenticatedGuard from './guards/AuthenticatedGuard'
import Home from './pages/Home/Home'

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
          <Route path={path.home} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
