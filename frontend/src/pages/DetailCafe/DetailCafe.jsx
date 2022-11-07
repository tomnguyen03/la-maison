import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
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

export default function DetailCafe() {
  Scroll.animateScroll.scrollToTop()

  const { idCafe } = useParams()
  const dispatch = useDispatch()
  const authenticated = useAuthenticated()

  const [dataCafe, setDataCafe] = useState({})
  const [imageCafe, setImageCafe] = useState([])
  const [isLikeCafe, setIsLikeCafe] = useState(false)
  const [showModalAuth, setShowModalAuth] = useState(false)
  const [showModalCollection, setShowModalCollection] =
    useState(false)
  const [showModalChooseCollection, setShowModalChooseCollection] =
    useState(false)
  const [collection, setCollection] = useState([])
  const [showLikeCount, setShowLikeCount] = useState(false)
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

  const handleClickLikeCafe = async () => {
    if (authenticated) {
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
    await dispatch(getCollection())
      .then(unwrapResult)
      .then(res => setCollection(res.data))

    if (!hasBookmark) {
      if (collection) {
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
  }

  const callbackHiddenModalCollection = () => {
    setShowModalCollection(false)
  }

  const callbackHiddenModalChooseCollection = () => {
    setShowModalChooseCollection(false)
  }

  return (
    <div className="mb-10">
      {dataCafe && (
        <div>
          <Helmet>
            <title>{dataCafe.name}</title>
          </Helmet>
          <div className="relative">
            <Carousel>
              {imageCafe &&
                imageCafe.map((item, index) => (
                  <div
                    className="duration-500 ease-in-out h-[400px]"
                    data-carousel-item
                    key={index}
                  >
                    <img
                      src={item}
                      className="bg-no-repeat bg-cover object-cover absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt=""
                    ></img>
                  </div>
                ))}
            </Carousel>
            <div className="absolute bottom-4 right-[200px] z-10 flex items-center justify-end gap-10">
              <div
                className="text-[28px] text-grey-f5 cursor-pointer relative"
                onClick={handleClickLikeCafe}
              >
                {isLikeCafe ? (
                  <i
                    className="bx bxs-heart"
                    onMouseEnter={() => setShowLikeCount(true)}
                    onMouseLeave={() => setShowLikeCount(false)}
                  ></i>
                ) : (
                  <i
                    className="bx bx-heart"
                    onMouseEnter={() => setShowLikeCount(true)}
                    onMouseLeave={() => setShowLikeCount(false)}
                  ></i>
                )}
                <div
                  className={`absolute z-10 bottom-[40px] left-[-20px] w-[65px] h-[30px] flex items-center justify-center text-base font-montserrat font-semibold rounded bg-grey-fa text-grey-3 ${
                    !showLikeCount && 'hidden'
                  }`}
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
                  <i className="bx bxs-bookmark"></i>
                ) : (
                  <i className="bx bx-bookmark"></i>
                )}
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-10 border-b-2 border-grey-d9 pb-6">
            <div className="grid grid-cols-2 gap-12">
              <div>
                <div className="border-b-2 border-grey-d9 pb-6">
                  <h1 className="text-3xl">{dataCafe.name}</h1>
                  <p className="text-sm mt-6">
                    {dataCafe.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-5 border-b-2 border-grey-d9 pb-6">
                  <div className="flex items-center gap-4">
                    <div>
                      <i className="bx bx-location-plus text-2xl"></i>
                    </div>
                    <div className="text-sm">
                      <p className="text-base mb-1">Địa chỉ</p>
                      <span>{dataCafe.detail_address}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <i className="bx bxl-instagram text-2xl"></i>
                    </div>
                    <div className="text-sm">
                      <p className="text-base mb-1">Instagram</p>
                      <span>{dataCafe.instagram || 'Updating'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <i className="bx bxl-facebook-circle text-2xl"></i>
                    </div>
                    <div className="text-sm">
                      <p className="text-base mb-1">Facebook</p>
                      <span>{dataCafe.facebook || 'Updating'}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-6">
                  <div className="">
                    <h3>STYLES</h3>
                    <div className="flex gap-4 mt-1">
                      {dataCafe.style_id &&
                        dataCafe.style_id.map((item, index) => (
                          <Button
                            title={item.name}
                            className="w-fit px-3 py-2 bg-grey-b8"
                            key={index}
                          />
                        ))}
                    </div>
                  </div>
                  <div>
                    <h3>VIBES</h3>
                    <div className="flex gap-4 mt-1">
                      {dataCafe.vibe_id &&
                        dataCafe.vibe_id.map((item, index) => (
                          <Button
                            title={item.name}
                            className="w-fit px-3 py-2 bg-grey-b8"
                            key={index}
                          />
                        ))}
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
            <h2 className="text-2xl mt-6 mb-3">Khám phá</h2>
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
