import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import InputField from 'src/components/InputField/InputField'
import { useDispatch } from 'react-redux'
import { register } from './auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export default function Register({ closeModal }) {
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
      .max(20, 'Vui lòng nhập 6-20 kí tự'),
    confirmPassword: yup
      .string()
      .required('Vui lòng xác nhận lại mật khẩu')
      .oneOf([yup.ref('password')], 'Xác nhận mật khẩu không đúng')
  })
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(schema)
  })

  const handleSubmit = async data => {
    try {
      const body = {
        email: data.email,
        password: data.password
      }

      const res = await dispatch(register(body))
      unwrapResult(res)
      closeModal()
      toast.success('Đăng ký thành công', {
        position: 'top-center',
        autoClose: 1500
      })
    } catch (error) {
      if (error.status === 403) {
        form.setError(error.key, {
          type: 'server',
          message: error.message
        })
      }
    }
  }

  return (
    <form className="mt-6" onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField
        name="email"
        type="email"
        placeholder="Email"
        form={form}
      />
      <InputField
        type="password"
        name="password"
        placeholder="Mật khẩu"
        form={form}
      />
      <InputField
        type="password"
        name="confirmPassword"
        placeholder="Nhập lại mật khẩu"
        form={form}
      />
      <div className="py-6 border-grey-9 border-b">
        <button className="w-full flex items-center justify-center p-2 bg-red-dd text-white text-sm rounded">
          Đăng ký
        </button>
      </div>
    </form>
  )
}
