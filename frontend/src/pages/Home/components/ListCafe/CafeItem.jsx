import React from 'react'
import { useSelector } from 'react-redux'
import SkeletonCafeItem from './SkeletonCafeItem'

export default function CafeItem(props) {
  const { name, address, image } = props
  const loading = useSelector(state => state.app.loading)

  const handleClick = () => {}

  return (
    <>
      {loading ? (
        <SkeletonCafeItem />
      ) : (
        <div>
          <img
            src={image}
            alt={name}
            className="cursor-pointer bg-center bg-no-repeat bg-cover object-cover h-[400px] w-[400px] rounded-md shadow-lg"
            onClick={handleClick}
          />
          <p className="mt-2 text-sm text-right pr-3 flex content-center justify-end gap-1">
            <i class="bx bx-location-plus text-base"></i>
            {address}
          </p>
          <h2
            className="mt-1 text-lg capitalize cursor-pointer w-fit"
            onClick={handleClick}
          >
            {name}
          </h2>
        </div>
      )}
    </>
  )
}
