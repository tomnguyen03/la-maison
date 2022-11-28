import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import {
  createLikeCafe,
  deleteBookmark,
  deleteLikeCafe,
  getDetailCafe
} from './detailCafe.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { Helmet } from 'react-helmet-async'
import Carousel from 'react-material-ui-carousel'
import Button from 'src/components/Button/Button'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import Comment from './components/Comment'
import ModalAuth from 'src/page-components/Auth/ModalAuth'
import CafeSlick from './components/CafeSlick'
import { toast } from 'react-toastify'
import { getCollection } from 'src/pages/User/Collection/collection.slice'
import CreateCollection from '../User/Collection/CreateCollection'
import Scroll from 'react-scroll'
import ChooseCollection from './components/ChooseCollection'
import lodash from 'lodash'
import Distance from './components/Distance'
import CarouselSkeleton from './components/CarouselSkeleton'
import { Skeleton } from '@mui/material'
import LocalStorage from '../../constants/localStorage'
import { updateCount } from '../Cafe/cafe.slice'

export default function DetailCafe() {
  Scroll.animateScroll.scrollToTop()

  const { idCafe } = useParams()
  const dispatch = useDispatch()
  const authenticated = useAuthenticated()
  const location = useLocation()

  const [dataCafe, setDataCafe] = useState({})
  const [imageCafe, setImageCafe] = useState([])
  const [isLikeCafe, setIsLikeCafe] = useState(false)
  const [showModalAuth, setShowModalAuth] = useState(false)
  const [showModalCollection, setShowModalCollection] =
    useState(false)
  const [showModalChooseCollection, setShowModalChooseCollection] =
    useState(false)
  const [collection, setCollection] = useState([])
  const [likeCount, setLikeCount] = useState(false)
  const [hasBookmark, setHasBookmark] = useState(false)

  const callbackHiddenModal = () => {
    setShowModalAuth(false)
  }

  const callbackShowModal = () => {
    setShowModalAuth(true)
  }

  useEffect(() => {
    dispatch(getDetailCafe(idCafe))
      .then(unwrapResult)
      .then(res => {
        setDataCafe(res.data)
        setImageCafe(res.data.images)
        setIsLikeCafe(res.data.isLike)
        setLikeCount(res.data.like_count)
        setHasBookmark(res.data.isBookmark)
      })
  }, [dispatch, idCafe])

  useEffect(() => {
    dispatch(updateCount({ url: location.pathname })).then(
      unwrapResult
    )
  }, [location.pathname, dispatch])

  const handleClickLikeCafe = async () => {
    if (!lodash.isEmpty(authenticated)) {
      if (isLikeCafe) {
        await dispatch(deleteLikeCafe(idCafe)).then(unwrapResult)
        setIsLikeCafe(false)
        setLikeCount(likeCount - 1)
      } else {
        await dispatch(createLikeCafe(idCafe)).then(unwrapResult)
        setIsLikeCafe(true)
        setLikeCount(likeCount + 1)
      }
    } else {
      setShowModalAuth(true)
    }
  }

  const handleClickShare = async () => {
    const pathUrl = window.location.href
    navigator.clipboard.writeText(pathUrl)

    toast.success('Sao chép liên kết thành công', {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true
    })
  }

  const handleClickBookmark = async () => {
    if (!lodash.isEmpty(authenticated)) {
      let listCollection = []

      await dispatch(getCollection())
        .then(unwrapResult)
        .then(res => {
          listCollection = res.data
          setCollection(res.data)
        })

      if (!hasBookmark) {
        if (!lodash.isEmpty(listCollection)) {
          setShowModalChooseCollection(true)
        } else {
          setShowModalCollection(true)
        }
      } else {
        await dispatch(deleteBookmark({ cafeId: idCafe })).then(
          unwrapResult
        )
        setHasBookmark(false)
        toast.success('Xóa Bookmark thành công', {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: true
        })
      }
    } else {
      setShowModalAuth(true)
    }
  }

  const callbackHiddenModalCollection = () => {
    setShowModalCollection(false)
  }

  const callbackHiddenModalChooseCollection = () => {
    setShowModalChooseCollection(false)
  }

  const myLocation = JSON.parse(
    localStorage.getItem(LocalStorage.LOCATION)
  )

  return (
    <div className="mb-10">
      {dataCafe && (
        <div>
          <Helmet>
            <title>{dataCafe.name}</title>
          </Helmet>
          <div className="relative">
            {dataCafe.images ? (
              <Carousel>
                {imageCafe &&
                  imageCafe.map((item, index) => (
                    <div
                      className="duration-500 ease-in-out h-[250px] lg:h-[400px]"
                      data-carousel-item
                      key={index}
                    >
                      <img
                        src={item}
                        className="bg-no-repeat bg-cover object-cover absolute block w-full h-full lg:h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-blue-1"
                        loading="lazy"
                        alt=""
                      ></img>
                    </div>
                  ))}
              </Carousel>
            ) : (
              <CarouselSkeleton />
            )}

            <div className="absolute bottom-10 lg:bottom-4 right-[10px] lg:right-[200px] z-10 flex items-center justify-end gap-10">
              <div
                className="text-[28px] text-grey-f5 cursor-pointer relative"
                onClick={handleClickLikeCafe}
              >
                {isLikeCafe ? (
                  <i className="bx bxs-heart text-red-dd"></i>
                ) : (
                  <i className="bx bx-heart"></i>
                )}
                <div
                  className={`absolute z-10 bottom-[40px] left-[-20px] w-[65px] h-[30px] flex items-center justify-center text-base font-montserrat font-semibold rounded bg-grey-fa text-grey-3`}
                >
                  <div className="popup-arrow-bottom"></div>
                  {likeCount}
                </div>
              </div>

              <div
                className="text-[28px] text-grey-f5 cursor-pointer"
                onClick={handleClickShare}
              >
                <i className="bx bx-share"></i>
              </div>
              <div
                className="text-[28px] text-grey-f5 cursor-pointer"
                onClick={handleClickBookmark}
              >
                {hasBookmark ? (
                  <i className="bx bxs-bookmark text-red-dd"></i>
                ) : (
                  <i className="bx bx-bookmark"></i>
                )}
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-10 border-b-2 border-grey-d9 pb-6 px-4">
            {dataCafe.location && myLocation ? (
              <Distance
                location={dataCafe.location}
                myLocation={myLocation}
              />
            ) : (
              myLocation && (
                <div className="mb-2 flex justify-end gap-2">
                  <Skeleton variant="text" height={20} width={200} />
                </div>
              )
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="border-b-2 border-grey-d9 pb-6">
                  {dataCafe.name ? (
                    <h1 className="text-3xl">{dataCafe.name}</h1>
                  ) : (
                    <Skeleton variant="text" height={36} />
                  )}

                  {dataCafe.description ? (
                    <p className="text-sm mt-6">
                      {dataCafe.description}
                    </p>
                  ) : (
                    <Skeleton variant="text" height={80} />
                  )}
                </div>
                <div className="mt-6 flex flex-col gap-5 border-b-2 border-grey-d9 pb-6">
                  <div className="flex items-center gap-4">
                    <div>
                      <i className="bx bx-map text-2xl"></i>
                    </div>
                    <div className="text-sm w-full">
                      <p className="text-base mb-1">Địa chỉ</p>
                      {dataCafe.detail_address ? (
                        <span>{dataCafe.detail_address}</span>
                      ) : (
                        <Skeleton
                          variant="text"
                          height={19}
                          style={{ width: '100%' }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <i className="bx bxl-instagram text-2xl"></i>
                    </div>
                    <div className="text-sm">
                      <p className="text-base mb-1">Instagram</p>
                      <span>{dataCafe.instagram || ''}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <i className="bx bxl-facebook-circle text-2xl"></i>
                    </div>
                    <div className="text-sm">
                      <p className="text-base mb-1">Facebook</p>
                      <span>{dataCafe.facebook || ''}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-6">
                  <div className="">
                    <h3>STYLES</h3>
                    <div className="flex gap-4 mt-1 w-full">
                      {dataCafe.style_id ? (
                        dataCafe.style_id.map((item, index) => (
                          <Button
                            title={item.name}
                            className="w-fit px-3 py-2 bg-grey-b8"
                            key={index}
                          />
                        ))
                      ) : (
                        <Skeleton
                          variant="text"
                          height={44}
                          style={{ width: '100%' }}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <h3>VIBES</h3>
                    <div className="flex gap-4 mt-1">
                      {dataCafe.vibe_id ? (
                        dataCafe.vibe_id.map((item, index) => (
                          <Button
                            title={item.name}
                            className="w-fit px-3 py-2 bg-grey-b8"
                            key={index}
                          />
                        ))
                      ) : (
                        <Skeleton
                          variant="text"
                          height={44}
                          style={{ width: '100%' }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Comment
                  idCafe={idCafe}
                  isShowModal={callbackShowModal}
                />
              </div>
            </div>
          </div>
          <div className="container mx-auto">
            <h2 className="text-2xl mt-6 mb-3 px-4 lg:px-0">
              Khám phá
            </h2>
            <CafeSlick />
          </div>
        </div>
      )}
      {showModalAuth ? (
        <ModalAuth hiddenModal={callbackHiddenModal} />
      ) : null}
      {showModalCollection ? (
        <CreateCollection
          closeModal={callbackHiddenModalCollection}
        />
      ) : null}
      {showModalChooseCollection ? (
        <ChooseCollection
          closeModal={callbackHiddenModalChooseCollection}
          collections={collection}
          cafeId={idCafe}
          bookmarkFalse={() => setHasBookmark(false)}
          bookmarkTrue={() => setHasBookmark(true)}
        />
      ) : null}
    </div>
  )
}
