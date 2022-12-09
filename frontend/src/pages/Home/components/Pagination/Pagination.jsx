import React from 'react'
import useQuery from 'src/hooks/useQuery'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import qs from 'query-string'
import Scroll from 'react-scroll'

export default function Pagination({ totalItem }) {
  const query = useQuery()
  const navigate = useNavigate()

  const handleClickPrev = () => {
    if (!query.page || Number.parseInt(query.page) === 1) return

    const params = {
      ...query,
      page: Number.parseInt(query.page) - 1
    }

    navigate(path.home + `?${qs.stringify(params)}`)
    Scroll.animateScroll.scrollToTop()
  }

  const handleClickNext = () => {
    if (Number.parseInt(query.page) === page) return

    const params = {
      ...query,
      page: Number.parseInt(query.page) + 1 || 2
    }

    navigate(path.home + `?${qs.stringify(params)}`)
    Scroll.animateScroll.scrollToTop()
  }

  const page = Math.ceil(totalItem / 15)

  return (
    <div className="flex items-center justify-between">
      <div
        className={`text-4xl cursor-pointer text-left ${
          (!query.page || Number.parseInt(query.page) === 1) &&
          'opacity-0 cursor-default'
        }`}
        onClick={handleClickPrev}
      >
        <i className="bx bx-left-arrow-alt"></i>
      </div>
      <div className="text-2xl flex gap-3">
        <div>
          {query.page ? (page < 10 ? `0${query.page}` : page) : '01'}
        </div>
      </div>
      <div
        className={`text-4xl cursor-pointer ${
          Number.parseInt(query.page) === page &&
          'opacity-0 cursor-default'
        }`}
        onClick={handleClickNext}
      >
        <i className="bx bx-right-arrow-alt"></i>
      </div>
    </div>
  )
}
