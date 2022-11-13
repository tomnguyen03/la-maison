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

export default function ListFilter() {
  const dispatch = useDispatch()
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

  return (
    <div className="flex items-center justify-center gap-14">
      {listFilter.map((item, index) => (
        <ListFilterItem
          title={item.title}
          dropdown={item.dropdown}
          key={index}
          ref={item.ref}
        />
      ))}
    </div>
  )
}
