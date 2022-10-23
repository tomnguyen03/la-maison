import React, { useState } from 'react'
import ListFilter from './components/ListFilter/ListFilter'
import { useNavigate } from 'react-router-dom'
import useQuery from 'src/hooks/useQuery'
import { path } from 'src/constants/path'
import qs from 'query-string'
import ListCafe from './components/ListCafe/ListCafe'
import Pagination from './components/Pagination/Pagination'
import Footer from './components/Footer/Footer'

export default function Home() {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const query = useQuery()

  const handleSubmitSearch = event => {
    event.preventDefault()

    const params = {
      ...query,
      search: searchValue.trim()
    }

    navigate(path.home + `?${qs.stringify(params)}`)
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="search-bar flex items-center justify-center">
          <div className="w-[50%] relative">
            <form onSubmit={handleSubmitSearch}>
              <input
                type="text"
                className="w-full text-sm text-grey-3 placeholder:text-grey-7 rounded px-5 py-3 bg-grey-f5 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] focus:outline-none focus:border-red-ee focus:ring-red-ee focus:ring-1"
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
          <ListCafe />
        </div>
        <div className="mt-10">
          <Pagination />
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  )
}
