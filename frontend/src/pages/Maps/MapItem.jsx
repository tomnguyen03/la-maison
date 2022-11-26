import React from 'react'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'

export default function MapItem({
  id,
  name,
  image,
  address,
  lat,
  lng,
  facebook,
  instagram,
  handleClickDirection,
  handleCancel
}) {
  const fb = facebook.split('/')[3]

  return (
    <div className="absolute z-10 left-0 top-0 bottom-0 w-[350px] bg-white shadow-lg">
      <div
        className="text-3xl text-grey-3 bg-white w-9 h-9 flex items-center justify-center rounded cursor-pointer absolute top-3 right-3"
        onClick={handleCancel}
      >
        <i className="bx bx-x"></i>
      </div>
      <div>
        <img
          src={image}
          alt=""
          className="bg-no-repeat bg-cover object-cover w-full h-[250px] bg-blue-1"
        />
        <div className="py-5">
          <div className="px-4 text-2xl border-b-2 border-grey-d9 pb-4">
            {name}
          </div>
          <div className="mt-4 flex justify-around px-5 border-b-2 border-grey-d9 pb-4">
            <div
              className="flex flex-col justify-center items-center text-sm text-red-dd cursor-pointer"
              onClick={() =>
                handleClickDirection({
                  latitude: lat,
                  longitude: lng
                })
              }
            >
              <i className="bx bxs-right-arrow-circle text-3xl"></i>
              Đường đi
            </div>
            {!isMobile ? (
              <Link
                to={`/${id}`}
                target="_blank"
                className="flex flex-col justify-center items-center text-sm text-red-dd cursor-pointer font-prata"
              >
                <i className="bx bxs-right-arrow-circle text-3xl"></i>
                Xem chi tiết
              </Link>
            ) : (
              <Link
                to={`/${id}`}
                className="flex flex-col justify-center items-center text-sm text-red-dd cursor-pointer font-prata"
              >
                <i className="bx bxs-right-arrow-circle text-3xl"></i>
                Xem chi tiết
              </Link>
            )}
          </div>
          <div className="mt-4 px-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <i className="bx bxs-map text-2xl"></i>
              {address}
            </div>
            <div className="flex items-center gap-2">
              <i className="bx bxl-facebook-circle text-2xl"></i>
              <div className="line-clamp-1">{fb}</div>
            </div>
            <div className="flex items-center gap-2">
              <i className="bx bxl-instagram text-2xl"></i>
              {instagram}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
