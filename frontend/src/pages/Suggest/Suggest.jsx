import React from 'react'
import * as yup from 'yup'
import InputField from 'src/components/InputField/InputFieldSuggest'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from 'src/components/Button/Button'
import { useDispatch } from 'react-redux'
import { createSuggest } from './suggest.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export default function Suggest() {
  const dispatch = useDispatch()

  const schema = yup.object().shape({})
  const form = useForm({
    defaultValues: {
      name: '',
      style: '',
      detail_address: '',
      instagram: '',
      website: ''
    },
    resolver: yupResolver(schema)
  })

  const handleSubmit = async data => {
    try {
      await dispatch(createSuggest(data)).then(unwrapResult)

      toast.success('Cảm ơn bạn đã suggest địa điểm', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="w-[600px] mx-auto mb-6">
        <h1 className="text-3xl">
          Chia sẻ quán cafe, địa chỉ trà sữa <br />
          đúng gu của bạn tại đây
        </h1>
        <p className="text-sm mt-4">
          Lan tỏa niềm yêu mến của bạn đối với địa điểm cafe, trà sữa
          ưu thích sẽ là nguồn năng lượng tích cực cho quán. Bạn đã
          sẵn sàng chia sẻ gu cafe của bản thân mình? Bắt đầu thôi!
        </p>
        <form
          className="mt-10"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div>
            <p className="text-sm font-semibold">
              Quán yêu thích của bạn là gì?
            </p>
            <InputField
              name="name"
              type="text"
              placeholder="Nhập tên quán bạn muốn..."
              form={form}
            />
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold">
              Quán có phong cách gì?
            </p>
            <InputField
              name="style"
              type="text"
              placeholder="Hiện đại, tối giản,..."
              form={form}
            />
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold">
              Địa chỉ quán ở đâu?
            </p>
            <InputField
              name="detail_address"
              type="text"
              placeholder="Nhập địa chỉ..."
              form={form}
            />
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold">
              Liên kết/tên instagram của quán?
            </p>
            <InputField
              name="instagram"
              type="text"
              placeholder="instagram.com/abc..."
              form={form}
            />
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold">
              Địa chỉ website của quán?
            </p>
            <InputField
              name="website"
              type="text"
              placeholder="abc.com...."
              form={form}
            />
          </div>
          <div className="mt-6">
            <Button type="submit" title="Gửi" className="p-2" />
          </div>
        </form>
      </div>
    </>
  )
}
