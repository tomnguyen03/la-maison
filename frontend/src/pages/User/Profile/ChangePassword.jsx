import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import InputField from 'src/components/InputField/InputField'
import Button from 'src/components/Button/Button'
import { changePassword } from '../../../page-components/Auth/auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export default function ChangePassword() {
  const dispatch = useDispatch()
  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Vui lòng nhập 6-20 kí tự')
      .max(20, 'Vui lòng nhập 6-20 kí tự'),
    newPassword: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(6, 'Vui lòng nhập 6-20 kí tự')
      .max(20, 'Vui lòng nhập 6-20 kí tự'),
    confirmNewPassword: yup
      .string()
      .required('Vui lòng xác nhận lại mật khẩu')
      .oneOf([yup.ref('newPassword')], 'Xác nhận mật khẩu không đúng')
  })
  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    resolver: yupResolver(schema)
  })

  const handleSubmit = async data => {
    try {
      const req = {
        current_password: data.oldPassword,
        new_password: data.newPassword
      }

      await dispatch(changePassword(req)).then(unwrapResult)

      toast.success('Đổi mật khẩu thành công', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true
      })
    } catch (error) {
      toast.error('Mật khẩu cũ sai', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true
      })
    }
  }
  return (
    <div className="px-2 lg:px-10 py-5 ">
      <div className="mb-4 pb-4 border-b border-gray-200">
        <h1 className="capitalize text-[18px] font-semibold">
          Thay đổi mật khẩu
        </h1>
        <span className="text-sm text-gray-600">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho
          người khác
        </span>
      </div>
      <div>
        <form
          className="pt-5"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="mb-5 flex items-center">
            <div className="w-[30%] lg:w-[15%] text-right">
              Mật khẩu cũ:
            </div>
            <div className="w-[70%] lg:w-[85%] pl-5 flex flex-col">
              <InputField
                type="password"
                name="oldPassword"
                form={form}
                value={form.getValues('oldPassword')}
              />
            </div>
          </div>
          <div className="mb-5 flex items-center">
            <div className="w-[30%] lg:w-[15%] text-right">
              Mật khẩu mới:
            </div>
            <div className="w-[70%] lg:w-[85%] pl-5 flex flex-col">
              <InputField
                type="password"
                name="newPassword"
                form={form}
                value={form.getValues('newPassword')}
              />
            </div>
          </div>
          <div className="mb-5 flex items-center">
            <div className="w-[30%] lg:w-[15%] text-right">
              Xác nhận mật khẩu mới:
            </div>
            <div className="w-[70%] lg:w-[85%] pl-5 flex flex-col">
              <InputField
                type="password"
                name="confirmNewPassword"
                form={form}
                value={form.getValues('confirmNewPassword')}
              />
            </div>
          </div>
          <div className="flex items-center justify-center pt-5">
            <Button title="Đăng ký" className="p-2" />
          </div>
        </form>
      </div>
    </div>
  )
}
