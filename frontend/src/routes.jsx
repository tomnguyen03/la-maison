import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { path } from 'src/constants/path'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import Home from 'src/pages/Home/Home'
import AuthenticatedGuard from 'src/guards/AuthenticatedGuard'
import User from 'src/pages/User/User'
import Profile from 'src/pages/User/Profile/Profile'
import UpdateProfile from 'src/pages/User/Profile/UpdateProfile'
import ChangePassword from 'src/pages/User/Profile/ChangePassword'
import Suggest from 'src/pages/Suggest/Suggest'

export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={path.home} element={<Home />} />

          <Route element={<AuthenticatedGuard />}>
            <Route path={path.user} element={<User />} />
            <Route
              path={path.user + path.profile}
              element={<Profile />}
            >
              <Route path="" element={<UpdateProfile />} />
              <Route path="upload" element={<UpdateProfile />} />
              <Route path="password" element={<ChangePassword />} />
            </Route>
            <Route path={path.suggestAPlace} element={<Suggest />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
