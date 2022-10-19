import React from 'react'
import qs from 'query-string'
import useQuery from 'src/hooks/useQuery'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'

export default function Dropdown(props) {
  const { listDropdown } = props
  const query = useQuery()
  const navigate = useNavigate()

  const { location, style, vibe } = query

  const handleClick = item => {
    let params = {}
    if (listDropdown.title === 'location') {
      params = {
        ...query,
        location: item
      }
    } else if (listDropdown.title === 'style') {
      params = {
        ...query,
        style: item
      }
    } else if (listDropdown.title === 'vibe') {
      params = {
        ...query,
        vibe: item
      }
    }

    navigate(path.home + `?${qs.stringify(params)}`)
  }

  return (
    <>
      <ul className="text-sm bg-white w-36 rounded h-[144px] overflow-scroll">
        {listDropdown.list.map((item, index) => (
          <li
            className={`px-4 py-2 hover:bg-red-f8 cursor-pointer ${
              (location === item.code ||
                style === item._id ||
                vibe === item._id) &&
              'bg-red-f8'
            }`}
            key={index}
            onClick={() => handleClick(item.code || item._id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  )
}
