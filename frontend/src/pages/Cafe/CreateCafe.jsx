import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button/Button'
import InputField from '../../components/InputField/InputField'
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {
  createCafe,
  getAllProvince,
  getDistrictsByProvince,
  getWardsByDistrict
} from './cafe.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  getStyle,
  getVibe
} from '../Home/components/ListFilter/listFilter.slice'
import { toast } from 'react-toastify'
import http from '../../utils/http'

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
    formData.append('style_id', data.styleId)
    formData.append('vibe_id', data.vibeId)

    try {
      await dispatch(
        createCafe(formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      ).then(unwrapResult)

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

  useEffect(() => {
    http.get('cafe').then(res => console.log(res))
  }, [])

  return (
    <div className="container mx-auto">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mt-5">
          <InputField
            name="name"
            type="text"
            placeholder="Name"
            form={form}
          />
        </div>
        <div className="mt-5">
          <InputField
            name="description"
            type="text"
            placeholder="Description"
            form={form}
          />
        </div>
        <div className="mt-5">
          <input
            {...form.register('images')}
            name="images"
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
          />
        </div>
        <div className="mt-5">
          <InputField
            name="detail_address"
            type="text"
            placeholder="Address"
            form={form}
          />
        </div>
        <div className="mt-5 flex gap-5">
          <select
            {...form.register('province')}
            className=" text-grey-3 text-sm rounded-lg block w-full p-2.5 "
            onChange={e => setProvinceCode(e.target.value)}
          >
            <option defaultValue>Choose</option>
            {province.map(item => (
              <option value={item.code} key={item.code}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            {...form.register('district')}
            className=" text-grey-3 text-sm rounded-lg block w-full p-2.5 "
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
          <select
            {...form.register('ward')}
            className=" text-grey-3 text-sm rounded-lg block w-full p-2.5 "
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
        <div className="mt-5 flex gap-5">
          <div className="w-full">
            <Select
              onChange={data => {
                setStyleId([])
                data.map(item => setStyleId([...styleId, item.value]))
              }}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={listStyle}
            />
          </div>
          <div className="w-full">
            <Select
              onChange={data => {
                setVibeId([])
                console.log(data)
                data.map(item => setVibeId([...vibeId, item.value]))
              }}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={listVibe}
            />
          </div>
        </div>
        <div className="mt-5">
          <InputField
            name="website"
            type="text"
            placeholder="Website"
            form={form}
          />
        </div>
        <div className="mt-5">
          <InputField
            name="instagram"
            type="text"
            placeholder="Instagram"
            form={form}
          />
        </div>
        <div className="mt-5">
          <InputField
            name="facebook"
            type="text"
            placeholder="Facebook"
            form={form}
          />
        </div>
        <div className="py-6 border-grey-9 border-b">
          <Button title="Tạo quán cafe" className="p-2" />
        </div>
      </form>
    </div>
  )
}
