import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { getRole } from '../Login/auth.slice'

export default function ModalRole({
  dataUser,
  closeModal,
  handleClickUpdate
}) {
  const dispatch = useDispatch()

  const [roles, setRoles] = useState([])
  const [chooseRole, setChooseRole] = useState('')

  useEffect(() => {
    dispatch(getRole())
      .then(unwrapResult)
      .then(res => setRoles(res.data))
  }, [dispatch])

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={closeModal}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="flex relative w-full max-w-xl mx-auto bg-white rounded-lg shadow-lg flex-col p-7">
          <div className="mb-4">Cập nhật Role</div>
          <div className="flex gap-3">
            <select
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={e => setChooseRole(e.target.value)}
            >
              <option value={dataUser.roleId._id}>
                {dataUser.roleId.name}
              </option>
              {roles.map(
                item =>
                  dataUser.roleId._id !== item._id && (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  )
              )}
            </select>
            <button
              className="px-5 py-2 rounded text-white bg-blue-700 text-sm"
              onClick={() =>
                handleClickUpdate(dataUser._id, chooseRole)
              }
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
