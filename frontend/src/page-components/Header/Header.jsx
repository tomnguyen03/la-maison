import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { useAuthenticated } from 'src/hooks/useAuthenticated'
import Logo from 'src/components/Logo/Logo'
import listenForOutsideClick from 'src/hooks/listenForOutsideClick'
import { logout } from 'src/page-components/Auth/auth.slice'
import LocalStorage from 'src/constants/localStorage'
import { GOONG_API_KEY } from 'src/constants/variables'
import { path } from 'src/constants/path'
import ModalAuth from '../Auth/ModalAuth'
import lodash from 'lodash'

export default function Header() {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const menuRef = useRef(null)
  const authenticated = useAuthenticated()

  const callbackHiddenModal = () => {
    setShowModal(false)
  }

  const checkAuthenticated = () => {
    !lodash.isEmpty(authenticated)
      ? setShowDropdown(true)
      : setShowModal(true)
  }

  const handleLogout = () => {
    dispatch(logout())
    setShowDropdown(false)

    toast.success('Đăng xuất thành công', {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true
    })
  }

  useEffect(() => {
    listenForOutsideClick(menuRef, setShowDropdown)
  }, [setShowDropdown])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      axios
        .get(
          `https://rsapi.goong.io/Geocode?latlng=${latitude},${longitude}&api_key=${GOONG_API_KEY}`
        )
        .then(data =>
          localStorage.setItem(
            LocalStorage.LOCATION,
            JSON.stringify({
              latitude: latitude,
              longitude: longitude,
              province: data.data.results[0].compound.province
            })
          )
        )
        .catch(error => console.log(error))
    })
  }, [])

  return (
    <div className="flex justify-between items-center px-[25px] py-[15px] border-b-2 border-grey-d9 mb-6">
      <Logo />
      <div className="text-sm font-medium flex items-center gap-[30px]">
        <Link to="/">VỀ LA MAISON</Link>
        <Link to="/">BẢN ĐỒ</Link>
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center cursor-pointer"
            onClick={checkAuthenticated}
          >
            <i className="bx bx-user-circle text-[27px]"></i>
          </button>
          <div
            className={`${
              showDropdown === false && 'hidden'
            } z-10 w-32 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 absolute right-0 mt-[5px]`}
          >
            <ul className="text-sm text-gray-700 dark:text-gray-200">
              <Link to={path.user} className="font-['Prata']">
                <li
                  className="px-3 py-2 hover:bg-red-f8 cursor-pointer"
                  onClick={() => setShowDropdown(false)}
                >
                  Trang cá nhân
                </li>
              </Link>
              <li className="px-3 py-2 hover:bg-red-f8 cursor-pointer">
                Cài đặt
              </li>
              <li
                className="px-3 py-2 hover:bg-red-f8 cursor-pointer"
                onClick={handleLogout}
              >
                Đăng xuất
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showModal ? (
        <ModalAuth hiddenModal={callbackHiddenModal} />
      ) : null}
    </div>
  )
}
