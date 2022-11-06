import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SkeletonCafeItem from 'src/pages/Home/components/ListCafe/SkeletonCafeItem'
import { path } from 'src/constants/path'
import Scroll from 'react-scroll'

export default function CafeSlickItem(props) {
  const { id, name, image } = props
  const loading = useSelector(state => state.app.loading)
  const navigate = useNavigate()

  const scroll = Scroll.animateScroll

  const handleClick = idCafe => {
    navigate(path.home + idCafe)
    scroll.scrollToTop()
  }

  return (
    <div className="flex items-center flex-col p-4">
      {loading ? (
        <SkeletonCafeItem />
      ) : (
        <div>
          <img
            src={image}
            alt={name}
            className="cursor-pointer bg-center bg-no-repeat bg-cover object-cover h-[400px] w-[400px] rounded-md shadow-lg"
            onClick={() => handleClick(id)}
          />
          <h2
            className="mt-1 text-lg capitalize cursor-pointer w-fit"
            onClick={() => handleClick(id)}
          >
            {name}
          </h2>
        </div>
      )}
    </div>
  )
}
