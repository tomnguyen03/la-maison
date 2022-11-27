import React from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import InputField from '../../components/InputField/InputField'
import { login } from './auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export default function Login() {
  const dispatch = useDispatch()

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập địa chỉ email')
      .email('Vui lòng nhập email hợp lệ'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Vui lòng nhập 6-20 kí tự')
      .max(20, 'Vui lòng nhập 6-20 kí tự')
  })
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const handleSubmit = async data => {
    try {
      const response = await dispatch(login(data)).then(unwrapResult)

      if (
        response.data.roleId.name === 'staff' ||
        response.data.roleId.name === 'admin'
      ) {
        toast.success('Đăng nhập thành công', {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: true
        })
      } else {
        toast.error('Bạn không có quyền truy cập', {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: true
        })
      }
    } catch (error) {
      if (error === 403) {
        toast.error(error.message, {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: true
        })
      }
    }
  }

  return (
    <form
      className="mt-10"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="relative w-full mb-8">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Email
        </label>
        <InputField
          name="email"
          type="email"
          placeholder="Email"
          form={form}
        />
      </div>

      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Password
        </label>

        <InputField
          type="password"
          name="password"
          placeholder="Password"
          form={form}
        />
      </div>

      <button className="text-center mt-6 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
        Sign In
      </button>
    </form>
  )
}
