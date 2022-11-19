import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import InputField from 'src/components/InputField/InputField'
import { useDispatch } from 'react-redux'
import { register } from './auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import Button from 'src/components/Button/Button'

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
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true
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
      <div className="mt-8">
        <InputField
          name="email"
          type="email"
          placeholder="Email"
          form={form}
        />
      </div>
      <div className="mt-7">
        <InputField
          type="password"
          name="password"
          placeholder="Mật khẩu"
          form={form}
        />
      </div>
      <div className="mt-7">
        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          form={form}
        />
      </div>
      <div className="py-6">
        <Button title="Đăng ký" className="p-2" />
      </div>
    </form>
  )
}
