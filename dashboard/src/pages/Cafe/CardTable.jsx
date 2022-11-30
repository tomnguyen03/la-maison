import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Scroll from 'react-scroll'

// components

export default function CardTable({ color, data }) {
  Scroll.animateScroll.scrollToTop()

  const [dataShow, setDataShow] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const start = (page - 1) * 10
    const end = page * 10

    setDataShow(data.slice(start, end))
  }, [page, data])

  const totalPage = Math.ceil(data.length / 10)

  const handleClickPrev = () => {
    if (page === 1) return
    return setPage(page - 1)
  }

  const handleClickNext = () => {
    if (page === totalPage) return
    return setPage(page + 1)
  }

  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          (color === 'light'
            ? 'bg-white'
            : 'bg-lightBlue-900 text-white')
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light'
                    ? 'text-blueGray-700'
                    : 'text-white')
                }
              >
                Cafes
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }
                >
                  Name
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }
                >
                  Address
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }
                >
                  Active
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {dataShow &&
                dataShow.map((item, index) => (
                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                        src={
                          item.images[0] ||
                          'https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg'
                        }
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <span
                        className={
                          'ml-3 font-bold ' +
                          +(color === 'light'
                            ? 'text-blueGray-600'
                            : 'text-white')
                        }
                      >
                        {item.name}
                      </span>
                    </th>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.detail_address}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div
          className="w-10 h-8 bg-lightBlue-700 hover:bg-lightBlue-600 duration-300 text-white text-sm flex justify-center items-center cursor-pointer mr-1"
          onClick={handleClickPrev}
        >
          Prev
        </div>
        {[...Array(totalPage)].fill(0).map((item, index) => (
          <div
            className={`text-lightBlue-700 text-sm cursor-pointer mr-1 ${
              index + 1 === page && 'font-bold'
            }`}
            key={index}
          >
            {index + 1}
          </div>
        ))}
        <div
          className="w-10 h-8 bg-lightBlue-700 hover:bg-lightBlue-600 duration-300 text-white text-sm flex justify-center items-center cursor-pointer mr-1"
          onClick={handleClickNext}
        >
          Next
        </div>
      </div>
    </>
  )
}

CardTable.defaultProps = {
  color: 'light'
}

CardTable.propTypes = {
  color: PropTypes.oneOf(['light', 'dark'])
}
