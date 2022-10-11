import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import InputField from 'src/components/InputField/InputField'

export default function Login() {
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
    console.log(data)
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

      <div className="mt-1 text-right text-xs text-red-dd">
        Quên mật khẩu
      </div>
      <div className="py-6 border-grey-9 border-b">
        <button className="w-full flex items-center justify-center p-2 bg-red-dd text-white text-sm rounded">
          Đăng nhập
        </button>
      </div>
    </form>
  )
}
