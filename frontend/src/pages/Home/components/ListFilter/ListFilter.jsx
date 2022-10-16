import React, { useEffect, useRef, useState } from 'react'
import ListFilterItem from './ListFilterItem'
import { useDispatch } from 'react-redux'
import { getStyle, getVibe } from './listFilter.slice'
import { unwrapResult } from '@reduxjs/toolkit'

export default function ListFilter() {
  const dispatch = useDispatch()
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
        list: listStyle
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
