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
              <Login closeModal={hiddenModal} />
            ) : (
              <Register closeModal={hiddenModal} />
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
  )
}
