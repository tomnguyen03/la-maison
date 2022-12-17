import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import InputField from 'src/components/InputField/InputField'
import { useDispatch } from 'react-redux'
import { login } from './auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import Button from 'src/components/Button/Button'

export default function Login({ closeModal }) {
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
      const res = await dispatch(login(data))
      unwrapResult(res)
      closeModal()
      toast.success('Đăng nhập thành công', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true
      })
    } catch (error) {
      if (error.status === 403) {
        form.setError('password', {
          type: 'server',
          message: error.message
        })
      }

      if (error.status === 405) {
        toast.error('Tài khoản đã bị khóa', {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: true
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

      <div className="mt-1 text-right text-xs text-red-dd">
        Quên mật khẩu
      </div>
      <div className="py-6 ">
        <Button title="Đăng nhập" className="p-2" />
      </div>
    </form>
  )
}
