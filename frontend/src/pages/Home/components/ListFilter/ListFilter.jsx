import React, { useEffect, useRef, useState } from 'react'
import ListFilterItem from './ListFilterItem'
import { useDispatch } from 'react-redux'
import {
  getDistrictsByProvince,
  getProvinceByName,
  getStyle,
  getVibe
} from './listFilter.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import LocalStorage from 'src/constants/localStorage'
import useQuery from 'src/hooks/useQuery'
import { path } from 'src/constants/path'
import { useNavigate } from 'react-router-dom'

export default function ListFilter() {
  const dispatch = useDispatch()
  const query = useQuery()
  const navigate = useNavigate()
  const [codeProvince, setCodeProvince] = useState('')
  const [listDistrict, setListDistrict] = useState([])
  const [listStyle, setListStyle] = useState([])
  const [listVibe, setListVibe] = useState([])

  const refLocation = useRef(null)
  const refStyle = useRef(null)
  const refVibe = useRef(null)

  const listFilter = [
    {
      title: 'Location',
      dropdown: {
        title: 'location',
        list: listDistrict
      },
      ref: refLocation
    },
    {
      title: 'Style',
      dropdown: {
        title: 'style',
        list: listStyle
      },
      ref: refStyle
    },
    {
      title: 'Vibe',
      dropdown: {
        title: 'vibe',
        list: listVibe
      },
      ref: refVibe
    }
  ]

  useEffect(() => {
    const _getCodeProvince = async () => {
      if (localStorage.getItem(LocalStorage.LOCATION)) {
        const province = JSON.parse(
          localStorage.getItem(LocalStorage.LOCATION)
        ).province
        const res = await dispatch(getProvinceByName(province))
        const data = unwrapResult(res)

        setCodeProvince(data.data[0].code)
      } else {
        const res = await dispatch(getProvinceByName('Đà Nẵng'))
        const data = unwrapResult(res)

        setCodeProvince(data.data[0].code)
      }
    }
    _getCodeProvince()
  }, [dispatch])

  useEffect(() => {
    if (codeProvince !== '') {
      dispatch(getDistrictsByProvince(codeProvince))
        .then(unwrapResult)
        .then(res => setListDistrict(res.data))
    }
  }, [codeProvince, dispatch])

  useEffect(() => {
    dispatch(getStyle())
      .then(unwrapResult)
      .then(res => setListStyle(res.data))
  }, [dispatch])

  useEffect(() => {
    dispatch(getVibe())
      .then(unwrapResult)
      .then(res => setListVibe(res.data))
  }, [dispatch])

  const removeQuery = () => {
    navigate(path.home)
  }

  return (
    <div className="flex items-center justify-center sm:gap-4 lg:gap-14 relative">
      {listFilter.map((item, index) => (
        <ListFilterItem
          title={item.title}
          dropdown={item.dropdown}
          key={index}
          ref={item.ref}
        />
      ))}
      <div
        className={`cursor-pointer absolute right-[-60px] z-10  ${
          !query.location &&
          !query.style &&
          !query.vibe &&
          !query.search &&
          'hidden'
        }`}
        onClick={removeQuery}
      >
        <i className="bx bx-x text-4xl font-light text-grey-7"></i>
      </div>
    </div>
  )
}
