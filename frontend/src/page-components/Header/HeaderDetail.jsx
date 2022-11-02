import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import backgroundAuth from 'src/assets/background_coffee.jpg'
import Login from 'src/page-components/Auth/Login'
import Register from 'src/page-components/Auth/Register'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import Logo from 'src/components/Logo/Logo'
import listenForOutsideClick from 'src/hooks/listenForOutsideClick'
import { logout } from 'src/page-components/Auth/auth.slice'
import LocalStorage from 'src/constants/localStorage'
import { GOONG_API_KEY } from 'src/constants/variables'
import { path } from 'src/constants/path'

export default function Header() {
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [auth, setAuth] = useState('login')
  const menuRef = useRef(null)
  const authenticated = useAuthenticated()

  const callbackShowModal = () => {
    setShowModal(false)
  }

  const checkAuthenticated = () => {
    authenticated ? setShowDropdown(true) : setShowModal(true)
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
    <div className="flex justify-between items-center px-[25px] py-[15px] absolute top-0 left-0 right-0 z-10 text-grey-f5">
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
            <ul className="text-sm text-grey-3 dark:text-gray-200">
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
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="flex relative w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
                <div className="w-[50%]">
                  <img
                    src={backgroundAuth}
                    alt="Background auth"
                    className="w-full object-cover rounded-tl-lg rounded-bl-lg"
                  />
                </div>

                <div className="px-9 w-[50%]">
                  <div className="flex justify-between mt-9">
                    <div
                      className={`cursor-pointer text-2xl ${
                        auth === 'login'
                          ? 'border-b-2 border-red-ee pb-1'
                          : ''
                      }`}
                      onClick={() => setAuth('login')}
                    >
                      Đăng nhập
                    </div>
                    <div
                      className={`cursor-pointer text-2xl ${
                        auth === 'register'
                          ? 'border-b-2 border-red-ee pb-1'
                          : ''
                      }`}
                      onClick={() => setAuth('register')}
                    >
                      Đăng ký
                    </div>
                  </div>
                  {auth === 'login' ? (
                    <Login closeModal={callbackShowModal} />
                  ) : (
                    <Register closeModal={callbackShowModal} />
                  )}
                  <div className="pt-6">
                    <button className="w-full flex items-center px-3 py-1 bg-white text-grey-3 border border-grey-9 text-sm gap-[10px] rounded">
                      <i className="bx bxl-facebook-circle text-red-e5 text-2xl"></i>
                      <span className="flex justify-center w-full">
                        Đăng nhập bằng Facebook
                      </span>
                    </button>
                  </div>
                  <div className="pt-4">
                    <button className="w-full flex items-center px-3 py-1 bg-white text-grey-3 border border-grey-9 text-sm gap-[10px] rounded">
                      <i className="bx bxl-google text-red-e5 text-2xl"></i>
                      <span className="flex justify-center w-full">
                        Đăng nhập bằng Google
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
