import React from 'react'
import { useSelector } from 'react-redux'
import SkeletonCafeItem from './SkeletonCafeItem'

export default function CafeItem(props) {
  const { name, style, image } = props
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
          <h2
            className="mt-4 text-lg capitalize cursor-pointer"
            onClick={handleClick}
          >
            {name}
          </h2>
          <p className="mt-2 text-sm">{style}</p>
        </div>
      )}
    </>
  )
}
