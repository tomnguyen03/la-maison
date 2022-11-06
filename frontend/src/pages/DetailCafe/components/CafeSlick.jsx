import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Slider from 'react-slick'
import { getListCafe } from 'src/pages/Cafe/cafe.slice'
import CafeSlickItem from './CafeSlickItem'

export default function CafeSlick() {
  const dispatch = useDispatch()

  const [listCafe, setListCafe] = useState([])
  useEffect(() => {
    dispatch(getListCafe())
      .then(unwrapResult)
      .then(res => setListCafe(res.data))
  }, [dispatch])

  const settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1
  }

  return (
    <div className="w-full block">
      <Slider {...settings}>
        {listCafe.map(
          (item, index) =>
            index < 5 && (
              <CafeSlickItem
                id={item._id}
                name={item.name}
                image={item.images[0]}
                address={item.detail_address}
                key={index}
              />
            )
        )}
      </Slider>
    </div>
  )
}
