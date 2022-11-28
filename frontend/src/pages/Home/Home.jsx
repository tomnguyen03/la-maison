import React, { useEffect, useState } from 'react'
import ListFilter from './components/ListFilter/ListFilter'
import { useLocation, useNavigate } from 'react-router-dom'
import useQuery from 'src/hooks/useQuery'
import { path } from 'src/constants/path'
import qs from 'query-string'
import ListCafe from './components/ListCafe/ListCafe'
import Pagination from './components/Pagination/Pagination'
import Footer from './components/Footer/Footer'
import { useDispatch } from 'react-redux'
import { getListCafe, updateCount } from '../Cafe/cafe.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { Helmet } from 'react-helmet-async'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
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

  const handleSubmitSearch = event => {
    event.preventDefault()

    const params = {
      search: searchValue.trim()
    }

    navigate(path.home + `?${qs.stringify(params)}`)
  }

  return (
    <>
      <Helmet>
        <title>La Maison</title>
      </Helmet>
      <div className="container mx-auto px-4 lg:px-0">
        <div className="search-bar flex items-center justify-center">
          <div className="w-[100%] lg:w-[50%] relative">
            <form onSubmit={handleSubmitSearch}>
              <input
                type="text"
                className="w-full text-sm text-grey-3 border border-grey-b8 placeholder:text-grey-7 rounded px-5 py-3 bg-grey-f5 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] focus:outline-none focus:border-red-ee focus:ring-red-ee focus:ring-1"
                placeholder="Bạn muốn đi cafe ở đâu?"
                onChange={e => setSearchValue(e.target.value)}
              />
              <span
                className="absolute cursor-pointer inset-y-0 right-[10px] flex items-center"
                onClick={handleSubmitSearch}
              >
                <i className="bx bx-search-alt-2 text-2xl"></i>
              </span>
            </form>
          </div>
        </div>
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
