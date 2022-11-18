import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getListCafeByCollection } from '../Cafe/cafe.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { Helmet } from 'react-helmet-async'
import ListCafe from '../Home/components/ListCafe/ListCafe'

export default function CollectionPage() {
  const { idCollection } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    dispatch(getListCafeByCollection(idCollection))
      .then(unwrapResult)
      .then(res => {
        setData(res.data)
        setName(res.name)
      })
  }, [dispatch, idCollection])

  return (
    <>
      <div className="container mx-auto">
        <Helmet>
          <title>{name}</title>
        </Helmet>
        <h1 className="text-2xl">Collection: {name}</h1>
        <div className="mt-10">
          <ListCafe listCafe={data} />
        </div>
      </div>
    </>
  )
}
