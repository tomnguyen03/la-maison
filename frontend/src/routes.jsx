import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { path } from 'src/constants/path'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import Home from 'src/pages/Home/Home'

export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={path.home} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
