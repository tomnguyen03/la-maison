import React, { useEffect, useState } from 'react'
import ListFilter from './components/ListFilter/ListFilter'
import { useLocation } from 'react-router-dom'
import useQuery from 'src/hooks/useQuery'
import ListCafe from './components/ListCafe/ListCafe'
import Pagination from './components/Pagination/Pagination'
import Footer from './components/Footer/Footer'
import { useDispatch } from 'react-redux'
import { getListCafe, updateCount } from '../Cafe/cafe.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { Helmet } from 'react-helmet-async'
import Search from './components/Search/Search'

export default function Home() {
  const query = useQuery()
  const dispatch = useDispatch()
  const location = useLocation()

  const [listCafe, setListCafe] = useState([])
  const [totalItem, setTotalItem] = useState(0)

  useEffect(() => {
    const params = {
      ...query,
      page: query.page || 1
    }

    dispatch(getListCafe({ params }))
      .then(unwrapResult)
      .then(res => {
        setListCafe(res.data)
        setTotalItem(res.totalItem)
      })
  }, [dispatch, query])

  useEffect(() => {
    dispatch(updateCount({ url: location.pathname })).then(
      unwrapResult
    )
  }, [location.pathname, dispatch])

  return (
    <>
      <Helmet>
        <title>La Maison</title>
      </Helmet>
      <div className="container mx-auto px-4 lg:px-0">
        <Search />
        <div className="flex items-center justify-center mt-6">
          <ListFilter />
        </div>
        <div className="mt-10">
          <ListCafe listCafe={listCafe} />
        </div>
        <div className={`mt-10 ${totalItem < 10 && 'hidden'}`}>
          <Pagination totalItem={totalItem} />
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  )
}
