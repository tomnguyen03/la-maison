import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { path } from 'src/constants/path'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import Home from 'src/pages/Home/Home'
import AuthenticatedGuard from 'src/guards/AuthenticatedGuard'
import User from 'src/pages/User/User'
import Profile from 'src/pages/User/Profile/Profile'
import UpdateProfile from 'src/pages/User/Profile/UpdateProfile'
import ChangePassword from 'src/pages/User/Profile/ChangePassword'
import Suggest from 'src/pages/Suggest/Suggest'
import CreateCafe from 'src/pages/Cafe/CreateCafe'
import DetailLayout from 'src/layouts/DetailLayout/DetailLayout'
import DetailCafe from 'src/pages/DetailCafe/DetailCafe'
import CollectionPage from 'src/pages/Collection/CollectionPage'

export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={path.home} element={<Home />} />
          <Route path={path.listCollection}>
            <Route
              path={path.paramsCollection}
              element={<CollectionPage />}
            />
            <Route
              path=""
              element={<Navigate to={path.home} replace />}
            />
          </Route>

          <Route element={<AuthenticatedGuard />}>
            <Route path={path.user} element={<User />} />
            <Route
              path={path.user + path.profile}
              element={<Profile />}
            >
              <Route path="upload" element={<UpdateProfile />} />
              <Route path="password" element={<ChangePassword />} />
              <Route
                path=""
                element={<Navigate to="upload" replace />}
              />
            </Route>
            <Route path={path.suggestAPlace} element={<Suggest />} />
            <Route path={path.createCafe} element={<CreateCafe />} />
          </Route>
        </Route>

        <Route element={<DetailLayout />}>
          <Route path={path.detailCafe} element={<DetailCafe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
