import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import InputField from 'src/components/InputField/InputField'

import { unwrapResult } from '@reduxjs/toolkit'
import Button from '../../../components/Button/Button'
import { updateAccount } from '../../../page-components/Auth/auth.slice'
import { toast } from 'react-toastify'
import lodash from 'lodash'

export default function UpdateProfile() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.auth.profile)

  const schema = yup.object().shape({
    phone: yup
      .string()
      .min(10, 'Số điện thoại gồm 10 chữ số')
      .max(10, 'Số điện thoại gồm 10 chữ số')
  })
  const form = useForm({
    defaultValues: {
      name: profile.name || '',
      phone: profile.phone || '',
      detail_address: profile.detail_address || '',
      birthday: profile.birthday || ''
    },
    resolver: yupResolver(schema)
  })

  const handleSubmit = async data => {
    try {
      let formData = new FormData()
      if (!lodash.isEmpty(data.avatar))
        formData.append('avatar', data.avatar[0])
      if (!lodash.isEmpty(data.name))
        formData.append('name', data.name)
      if (!lodash.isEmpty(data.birthday))
        formData.append('birthday', data.birthday)
      if (!lodash.isEmpty(data.phone))
        formData.append('phone', data.phone)
      if (!lodash.isEmpty(data.detail_address))
        formData.append('detail_address', data.detail_address)

      await dispatch(updateAccount(formData)).then(unwrapResult)

      toast.success('Cập nhật thành công', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="px-10 py-5 bg-white">
      <div className="mb-4 pb-4 border-b border-gray-200">
        <h1 className="capitalize text-[18px] font-semibold">
          Hồ sơ của tôi
        </h1>
        <span className="text-sm text-gray-600">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </span>
      </div>
      <div>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="mt-5 flex items-center">
                <div className="w-[15%] text-right">Email:</div>
                <div className="w-[85%] pl-5">{profile.email}</div>
              </div>
              <div className="mt-5 flex items-center">
                <div className="w-[15%] text-right">Họ và tên:</div>
                <div className="w-[85%] pl-5">
                  <InputField
                    name="name"
                    type="text"
                    placeholder="Nhập họ và tên..."
                    form={form}
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <div className="w-[15%] text-right">Ngày sinh:</div>
                <div className="w-[85%] pl-5">
                  <InputField
                    name="birthday"
                    type="date"
                    placeholder="Nhập ngày sinh..."
                    form={form}
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <div className="w-[15%] text-right">
                  Số điện thoại:
                </div>
                <div className="w-[85%] pl-5">
                  <InputField
                    name="phone"
                    type="text"
                    placeholder="Nhập số điện thoại..."
                    form={form}
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <div className="w-[15%] text-right">Địa chỉ:</div>
                <div className="w-[85%] pl-5 flex flex-col gap-2">
                  <InputField
                    name="detail_address"
                    type="text"
                    placeholder="Nhập địa chỉ..."
                    form={form}
                  />
                </div>
              </div>
            </div>
            <div className="w-[200px] mt-5 flex flex-col items-center">
              <img
                src={
                  profile.avatar ||
                  'https://remax.fi/static/shelter/themes/remax/img/default-news-image.jpg'
                }
                alt="avatar"
                className="w-[150px] h-[150px] bg-center bg-no-repeat bg-cover object-cover rounded"
              />
              <input
                {...form.register('avatar')}
                name="avatar"
                type="file"
                accept=".jpg,.jpeg,.png"
                className="py-2 px-3 text-grey-3 w-full text-sm mt-3"
                aria-label="File browser example"
              />
            </div>
          </div>
          <Button
            type="submit"
            title="Cập nhật"
            className="mt-5 py-2"
          />
        </form>
      </div>
    </div>
  )
}
