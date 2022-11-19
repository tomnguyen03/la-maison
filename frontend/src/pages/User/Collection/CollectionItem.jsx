import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../../../components/Button/Button'
import SkeletonCollectionItem from './SkeletonCollectionItem'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isMobile } from 'react-device-detect'

export default function CollectionItem(props) {
  const { name, images, id } = props
  const loading = useSelector(state => state.app.loading)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/collection/${id}`)
  }

  const handleClickCopyLink = () => {
    const pathUrl = window.location.origin + `/collection/${id}`
    navigator.clipboard.writeText(pathUrl)

    toast.success('Sao chép liên kết thành công', {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true
    })
  }

  const widthScreen = window.innerWidth - 32

  return (
    <>
      {loading ? (
        <SkeletonCollectionItem />
      ) : (
        <div className="relative">
          {images.length ? (
            <div
              className="h-[400px] w-full lg:w-[400px] rounded-md shadow-lg flex gap-[2px] flex-wrap cursor-pointer"
              onClick={handleClick}
            >
              {images.map((image, index) => {
                if (images.length === 1)
                  return isMobile ? (
                    <img
                      src={image}
                      alt={name}
                      style={{ width: widthScreen }}
                      className={`bg-center bg-no-repeat bg-cover object-cover h-[400px]`}
                      key={index}
                    />
                  ) : (
                    <img
                      src={image}
                      alt={name}
                      className={`bg-center bg-no-repeat bg-cover object-cover w-[400px] h-[400px]`}
                      key={index}
                    />
                  )
                else if (images.length === 2)
                  return isMobile ? (
                    <img
                      src={image}
                      alt={name}
                      style={{ width: widthScreen }}
                      className={`bg-center bg-no-repeat bg-cover object-cover h-[200px]`}
                      key={index}
                    />
                  ) : (
                    <img
                      src={image}
                      alt={name}
                      className={`bg-center bg-no-repeat bg-cover object-cover w-[400px] h-[200px]`}
                      key={index}
                    />
                  )
                else if (images.length === 3)
                  return index === 2 ? (
                    isMobile ? (
                      <img
                        src={image}
                        alt={name}
                        style={{ width: widthScreen }}
                        className="bg-center bg-no-repeat bg-cover object-cover h-[199px]"
                        key={index}
                      />
                    ) : (
                      <img
                        src={image}
                        alt={name}
                        className="bg-center bg-no-repeat bg-cover object-cover w-[400px] h-[199px]"
                        key={index}
                      />
                    )
                  ) : isMobile ? (
                    <img
                      src={image}
                      alt={name}
                      style={{ width: widthScreen / 2 - 1 }}
                      className="bg-center bg-no-repeat bg-cover object-cover h-[199px]"
                      key={index}
                    />
                  ) : (
                    <img
                      src={image}
                      alt={name}
                      className="bg-center bg-no-repeat bg-cover object-cover w-[199px] h-[199px]"
                      key={index}
                    />
                  )
                else if (images.length === 4)
                  return isMobile ? (
                    <img
                      src={image}
                      alt={name}
                      style={{ width: widthScreen / 2 - 1 }}
                      className="bg-center bg-no-repeat bg-cover object-cover h-[199px]"
                      key={index}
                    />
                  ) : (
                    <img
                      src={image}
                      alt={name}
                      className="bg-center bg-no-repeat bg-cover object-cover w-[199px] h-[199px]"
                      key={index}
                    />
                  )

                return (
                  index < 4 && (
                    <div className="relative" key={index}>
                      {isMobile ? (
                        <img
                          src={image}
                          alt={name}
                          style={{ width: widthScreen / 2 - 1 }}
                          className="bg-center bg-no-repeat bg-cover object-cover h-[199px]"
                        />
                      ) : (
                        <img
                          src={image}
                          alt={name}
                          className="bg-center bg-no-repeat bg-cover object-cover w-[199px] h-[199px]"
                        />
                      )}
                      {index === 3 && (
                        <div className="absolute left-0 right-0 top-0 bottom-0 z-10 flex items-center justify-center text-white text-2xl bg-black opacity-70">{`+${
                          images.length - 4
                        }`}</div>
                      )}
                    </div>
                  )
                )
              })}
            </div>
          ) : (
            <img
              src={`https://remax.fi/static/shelter/themes/remax/img/default-news-image.jpg`}
              alt={name}
              className="cursor-pointer bg-center bg-no-repeat bg-cover object-cover h-[400px] w-[400px] rounded-md shadow-lg"
              onClick={handleClick}
            />
          )}
          <Button
            className="absolute z-10 right-3 top-3 w-fit px-3 py-1 text-xs"
            title="Copy link"
            onClick={handleClickCopyLink}
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
