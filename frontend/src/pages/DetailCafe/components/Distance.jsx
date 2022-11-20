import axios from 'axios'
import React, { useState } from 'react'
import { GOONG_API_KEY } from '../../../constants/variables'
import lodash from 'lodash'
import { useEffect } from 'react'

export default function Distance({ location, myLocation }) {
  const [distance, setDistance] = useState({})

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

  return distance.distance ? (
    <div className="italic text-grey-5 text-sm font-montserrat mb-2 flex justify-end gap-2">
      <div>{`Khoảng ${distance.distance.text}`}</div>
      <div className="flex items-center gap-1 border-l pl-2 border-grey-7">
        <i className="bx bxs-time"></i>
        {`${distance.duration.text}`}
      </div>
    </div>
  ) : null
}
