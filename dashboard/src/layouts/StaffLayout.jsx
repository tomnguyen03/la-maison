import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from 'src/components/Sidebar/Sidebar'
import AdminNavbar from 'src/components/Navbars/AdminNavbar'
import HeaderStaff from '../components/Headers/HeaderStaff'

export default function StaffLayout() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStaff />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Outlet />
        </div>
      </div>
    </>
  )
}
