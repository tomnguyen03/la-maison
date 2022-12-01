import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { unwrapResult } from '@reduxjs/toolkit'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {
  createCafe,
  getAllProvince,
  getDistrictsByProvince,
  getStyle,
  getVibe,
  getWardsByDistrict
} from './cafe.slice'
import InputFieldCreate from './InputFieldCreate'

export default function CreateCafe() {
  const [province, setProvince] = useState([])
  const [provinceCode, setProvinceCode] = useState('')

  const [district, setDistrict] = useState([])
  const [districtCode, setDistrictCode] = useState('')

  const [ward, setWard] = useState([])

  const [listStyle, setListStyle] = useState([])
  const [styleId, setStyleId] = useState([])
  const [listVibe, setListVibe] = useState([])
  const [vibeId, setVibeId] = useState([])

  const dispatch = useDispatch()

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      detail_address: '',
      website: '',
      instagram: '',
      facebook: ''
    }
  })

  useEffect(() => {
    const _getAllProvince = async () => {
      const res = await dispatch(getAllProvince())
      const { data } = unwrapResult(res)
      setProvince(data)
    }

    _getAllProvince()
  }, [dispatch])

  useEffect(() => {
    if (provinceCode) {
      const _getDistrictByProvince = async () => {
        const res = await dispatch(
          getDistrictsByProvince(provinceCode)
        )
        const { data } = unwrapResult(res)
        setDistrict(data)
      }

      _getDistrictByProvince()
    }
  }, [dispatch, provinceCode])

  useEffect(() => {
    if (districtCode) {
      const _getWardByDistrictCode = async () => {
        const res = await dispatch(getWardsByDistrict(districtCode))
        const { data } = unwrapResult(res)
        setWard(data)
      }

      _getWardByDistrictCode()
    }
  }, [dispatch, districtCode])

  useEffect(() => {
    const _getStyle = async () => {
      const res = await dispatch(getStyle())
      const { data } = unwrapResult(res)

      const response = data.map(({ _id: value, name: label }) => ({
        value,
        label
      }))

      setListStyle(response)
    }
    _getStyle()
  }, [dispatch])

  useEffect(() => {
    const _getVibe = async () => {
      const res = await dispatch(getVibe())
      const { data } = unwrapResult(res)

      const response = data.map(({ _id: value, name: label }) => ({
        value,
        label
      }))

      setListVibe(response)
    }
    _getVibe()
  }, [dispatch])

  const handleSubmit = async data => {
    //Upload Image
    let formData = new FormData()
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i])
    }

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('detail_address', data.detail_address)
    formData.append('website', data.website)
    formData.append('instagram', data.instagram)
    formData.append('facebook', data.facebook)
    formData.append('provinceId', data.province)
    formData.append('districtId', data.district)
    formData.append('wardId', data.ward)
    styleId.map(item => formData.append('style_id', item.value))
    vibeId.map(item => formData.append('vibe_id', item.value))

    try {
      await dispatch(createCafe(formData)).then(unwrapResult)

      toast.success('Đăng ký thành công', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true
      })
    } catch (error) {
      console.log(error)
    }
  }

  const animatedComponents = makeAnimated()

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Create Cafe
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              information
            </h6>
            <div className="flex flex-wrap mt-3 mb-6">
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Name
                  </label>
                  <InputFieldCreate
                    name="name"
                    type="text"
                    placeholder="Name"
                    form={form}
                  />
                </div>
              </div>

              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Description
                  </label>
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Description...."
                        rows="4"
                        onChange={field.onChange}
                        value={form.getValues('description')}
                      ></textarea>
                    )}
                  />
                </div>
              </div>

              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Image
                  </label>
                  <input
                    {...form.register('images')}
                    name="images"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Address
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <InputFieldCreate
                    name="detail_address"
                    type="text"
                    placeholder="Detail Address"
                    form={form}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Province
                  </label>
                  <select
                    {...form.register('province')}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setProvinceCode(e.target.value)}
                  >
                    <option defaultValue>Choose</option>
                    {province.map(item => (
                      <option value={item.code} key={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    District
                  </label>
                  <select
                    {...form.register('district')}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={e => setDistrictCode(e.target.value)}
                  >
                    <option defaultValue>Choose</option>
                    {district &&
                      district.map(item => (
                        <option value={item.code} key={item.code}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Ward
                  </label>
                  <select
                    {...form.register('ward')}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option defaultValue>Choose</option>
                    {ward &&
                      ward.map(item => (
                        <option value={item.code} key={item.code}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              STYLE & VIBE
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    STYLE
                  </label>
                  <Select
                    onChange={data => setStyleId(data)}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={listStyle}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    VIBE
                  </label>
                  <Select
                    onChange={data => setVibeId(data)}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={listVibe}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              SOCIAL
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    FACEBOOK
                  </label>
                  <InputFieldCreate
                    name="facebook"
                    type="text"
                    placeholder="Facebook"
                    form={form}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    instagram
                  </label>
                  <InputFieldCreate
                    name="instagram"
                    type="text"
                    placeholder="Instagram"
                    form={form}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    website
                  </label>
                  <InputFieldCreate
                    name="website"
                    type="text"
                    placeholder="Website"
                    form={form}
                  />
                </div>
              </div>
            </div>
            <div className="py-6 border-grey-9 border-b">
              <button className="px-5 py-3 bg-lightBlue-700 text-white rounded">
                Tạo quán cafe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
