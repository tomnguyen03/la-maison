import React from 'react'
import { useSelector } from 'react-redux'
import SkeletonCollectionItem from './SkeletonCollectionItem'

export default function CollectionItem(props) {
  const { name, image } = props
  const loading = useSelector(state => state.app.loading)

  const handleClick = () => {}

  return (
    <>
      {loading ? (
        <SkeletonCollectionItem />
      ) : (
        <div>
          <img
            src={image}
            alt={name}
            className="cursor-pointer bg-center bg-no-repeat bg-cover object-cover h-[400px] w-[400px] rounded-md shadow-lg"
            onClick={handleClick}
          />
          <h2
            className="mt-4 text-lg capitalize cursor-pointer w-fit"
            onClick={handleClick}
          >
            {name}
          </h2>
        </div>
      )}
    </>
  )
}
