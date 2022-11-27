import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from 'src/components/Sidebar/Sidebar'
import AdminNavbar from 'src/components/Navbars/AdminNavbar'
import HeaderStats from 'src/components/Headers/HeaderStats'

export default function AdminLayout() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Outlet />
        </div>
      </div>
    </>
  )
}
