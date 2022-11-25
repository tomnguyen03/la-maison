import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import PasswordIcon from '@mui/icons-material/Password'
import { NavLink, Outlet } from 'react-router-dom'
import { path } from 'src/constants/path'
import { Helmet } from 'react-helmet-async'

export default function Profile() {
  let activeStyle = {
    color: '#e57373',
    fontWeight: 'bold'
  }
  return (
    <div className="container mx-auto lg:flex px-4 lg:px-0">
      <Helmet>
        <title>Cài đặt</title>
      </Helmet>
      <div className="flex-[0_0_190px] flex flex-row lg:flex-col gap-4 mr-[50px]">
        <NavLink
          style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }
          to={path.user + path.profile + path.upload}
          className="flex items-center gap-2 font-prata"
        >
          <PersonIcon color="error" />
          Thông tin cá nhân
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive ? activeStyle : undefined
          }
          to={path.user + path.profile + path.password}
          className="flex items-center gap-2 font-prata"
        >
          <PasswordIcon color="error" />
          Đổi mật khẩu
        </NavLink>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
