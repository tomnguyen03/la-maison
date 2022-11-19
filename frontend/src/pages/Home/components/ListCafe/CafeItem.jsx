import React from 'react'
import { useSelector } from 'react-redux'
import SkeletonCafeItem from './SkeletonCafeItem'
import { useNavigate } from 'react-router-dom'
import { path } from '../../../../constants/path'

export default function CafeItem(props) {
  const { id, name, address, image } = props
  const loading = useSelector(state => state.app.loading)
  const navigate = useNavigate()

  const handleClick = idCafe => {
    navigate(path.home + idCafe)
  }

  return (
    <>
      {loading ? (
        <SkeletonCafeItem />
      ) : (
        <div>
          <img
            src={image}
            alt={name}
            className="w-full cursor-pointer bg-center bg-no-repeat bg-cover object-cover h-[400px] lg:w-[400px] rounded-md shadow-lg"
            onClick={() => handleClick(id)}
          />
          <p className="mt-2 text-sm text-right pr-3 flex content-center justify-end gap-1">
            <i className="bx bx-location-plus text-base"></i>
            {address}
          </p>
          <h2
            className="lg:mt-1 text-lg capitalize cursor-pointer w-fit"
            onClick={() => handleClick(id)}
          >
            {name}
          </h2>
        </div>
      )}
    </>
  )
}
