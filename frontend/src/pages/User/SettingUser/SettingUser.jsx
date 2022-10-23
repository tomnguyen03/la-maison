import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from 'src/page-components/Auth/auth.slice'
import { toast } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'

export default function SettingUser() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickLogout = () => {
    dispatch(logout())
    navigate(path.home)

    toast.success('Đăng xuất thành công', {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true
    })
  }

  return (
    <div className="flex flex-col items-center">
      <img
        src={
          'https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/280759075_1625581977810747_7000233858509528729_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=XKxPHtc8ZacAX9OFW4j&tn=I_RUtshZaNgmJ-hu&_nc_ht=scontent.fdad3-6.fna&oh=00_AT8ZDyE45GmfBr8jfcke0E0GytRc6Bk3wjdSL5cdK7_XOQ&oe=63579BA0'
        }
        alt="Avatar"
        className="w-20 h-20 rounded-full bg-center bg-no-repeat bg-cover object-cover"
      />
      <div className="flex items-center justify-center gap-5 mt-4">
        <div className="text-grey-3 bg-grey-d9 text-sm flex items-center justify-center w-36 h-6 cursor-pointer">
          <NavLink
            to={path.user + path.profile}
            className="font-['Prata']"
          >
            Chỉnh sửa hồ sơ
          </NavLink>
        </div>
        <div
          className="text-grey-3 bg-grey-d9 text-sm flex items-center justify-center w-36 h-6 cursor-pointer"
          onClick={handleClickLogout}
        >
          Đăng xuất
        </div>
      </div>
    </div>
  )
}
