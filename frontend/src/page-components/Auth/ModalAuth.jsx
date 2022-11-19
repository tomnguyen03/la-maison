import React, { useState } from 'react'
import backgroundAuth from 'src/assets/background_coffee.jpg'
import Login from 'src/page-components/Auth/Login'
import Register from 'src/page-components/Auth/Register'

export default function ModalAuth({ hiddenModal }) {
  const [auth, setAuth] = useState('login')

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto text-grey-3">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={hiddenModal}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="flex relative w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
          <div className="hidden lg:block lg:w-[50%]">
            <img
              src={backgroundAuth}
              alt="Background auth"
              className="w-full object-cover rounded-tl-lg rounded-bl-lg"
            />
          </div>

          <div className="px-9 w-[100%] lg:w-[50%]">
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
              <Login closeModal={hiddenModal} />
            ) : (
              <Register closeModal={hiddenModal} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
