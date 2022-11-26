import axios from 'axios'
import React, { useState } from 'react'
import { GOONG_API_KEY } from '../../../constants/variables'
import lodash from 'lodash'
import { useEffect } from 'react'
import Button from '../../../components/Button/Button'
import MapDistance from './MapDistance'

export default function Distance({ location, myLocation }) {
  const [distance, setDistance] = useState({})
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const _getDistance = async () => {
      await axios
        .get(
          `https://rsapi.goong.io/DistanceMatrix?api_key=${GOONG_API_KEY}&origins=${myLocation.latitude},${myLocation.longitude}&destinations=${location.lat},${location.lng}&vehicle=car`
        )
        .then(
          data =>
            !lodash.isEmpty(data.data.rows[0].elements[0]) &&
            setDistance(data.data.rows[0].elements[0])
        )
        .catch(error => console.log(error))
    }

    _getDistance()
  }, [location, myLocation])

  const callbackHiddenModal = () => {
    setShowModal(false)
  }

  return distance.distance ? (
    <div className="flex gap-4 justify-end items-center mb-3">
      <div className="italic text-grey-5 text-sm font-montserrat flex justify-end gap-2">
        <div>{`Khoảng ${distance.distance.text}`}</div>
        <div className="flex items-center gap-1 border-l pl-2 border-grey-7">
          <i className="bx bxs-time"></i>
          {`${distance.duration.text}`}
        </div>
      </div>
      <Button
        title="Chỉ đường"
        className="w-fit px-3 py-2 "
        onClick={() => setShowModal(true)}
      />
      {showModal ? (
        <MapDistance
          myLocation={myLocation}
          destination={location}
          hiddenModal={callbackHiddenModal}
        />
      ) : null}
    </div>
  ) : null
}
