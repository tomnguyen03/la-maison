import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import * as qs from 'query-string'
import cafeApi from 'src/api/cafe.api'
import listenForOutsideClick from 'src/hooks/listenForOutsideClick'

export default function Search() {
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState('')
  const [searchList, setSearchList] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  const refSearchDropdown = useRef(null)

  const handleSubmitSearch = event => {
    event.preventDefault()

    const params = {
      search: searchValue.trim()
    }

    navigate(path.home + `?${qs.stringify(params)}`)
  }

  const handleChangeSearch = async value => {
    setSearchValue(value)

    if (value) {
      const data = await cafeApi.searchCafe(value)

      setSearchList(data.data)
      setShowDropdown(true)
    } else {
      setSearchList([])
      setShowDropdown(false)
    }
  }

  const handleClickSearchItem = val => {
    navigate(path.home + val)
  }

  useEffect(() => {
    listenForOutsideClick(refSearchDropdown, setShowDropdown)
  }, [setShowDropdown])

  return (
    <div className="search-bar flex items-center justify-center">
      <div className="w-[100%] lg:w-[50%] relative">
        <form onSubmit={handleSubmitSearch}>
          <input
            type="text"
            className="w-full text-sm text-grey-3 border border-grey-b8 placeholder:text-grey-7 rounded px-5 py-3 bg-grey-f5 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] focus:outline-none focus:border-red-ee focus:ring-red-ee focus:ring-1"
            placeholder="Bạn muốn đi cafe ở đâu?"
            onChange={e => handleChangeSearch(e.target.value)}
          />
          <button className="absolute cursor-pointer inset-y-0 right-[10px] flex items-center">
            <i className="bx bx-search-alt-2 text-2xl"></i>
          </button>
        </form>

        <div
          className={`absolute top-[48px] z-20 rounded w-full bg-grey-f5 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] ${
            !showDropdown && 'hidden'
          }`}
          ref={refSearchDropdown}
        >
          {searchList.map(item => (
            <div
              className="w-full text-sm text-grey-3 px-5 py-3 cursor-pointer hover:bg-red-f8"
              key={item._id}
              onClick={() => handleClickSearchItem(item._id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
