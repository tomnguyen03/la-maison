import React, { useEffect } from 'react'
import { useState } from 'react'
import ReactMapGL, {
  GeolocateControl,
  Marker,
  Source,
  Layer
} from '@goongmaps/goong-map-react'
import polyliline from '@mapbox/polyline'
import gmsDirections from '@goongmaps/goong-sdk/services/directions'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import {
  GOONG_API_KEY,
  GOONG_MAPTILES_KEY
} from 'src/constants/variables'

import { getListLocation } from './maps.slice'
import './map.css'
import MapItem from './MapItem'
import LocalStorage from 'src/constants/localStorage'

export default function Maps() {
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [showItem, setShowItem] = useState(false)
  const [dataItem, setDataItem] = useState({})
  const [geojson, setGeojson] = useState()

  const geolocateStyle = {
    top: 0,
    left: 0,
    margin: 10
  }
  const positionOptions = { enableHighAccuracy: true }

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 16.07558,
    longitude: 108.1558308,
    zoom: 14,
    bearing: 0,
    pitch: 0
  })

  useEffect(() => {
    dispatch(getListLocation())
      .then(unwrapResult)
      .then(res => setData(res.data))
  }, [dispatch])

  const handleOpenItem = data => {
    setDataItem(data)
    setShowItem(true)
  }

  const handleClickDirection = data => {
    const base = gmsDirections({
      accessToken: GOONG_API_KEY
    })

    const myLocation = JSON.parse(
      localStorage.getItem(LocalStorage.LOCATION)
    )

    const origin = `${myLocation.latitude},${myLocation.longitude}`
    const destination = `${data.latitude},${data.longitude}`

    base
      .getDirections({
        origin: origin,
        destination: destination,
        vehicle: 'car'
      })
      .send()
      .then(function (response) {
        var directions = response.body
        var route = directions.routes[0]

        const geometry_string = route.overview_polyline.points

        setGeojson({
          type: 'Feature',
          properties: {},
          geometry: polyliline.toGeoJSON(geometry_string)
        })
      })
  }

  const handleClickCancelItem = () => {
    setGeojson()

    setShowItem(false)
  }

  const layerStyle = {
    id: 'line',
    source: 'route',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#e56d7b',
      'line-width': 5
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      localStorage.setItem(
        LocalStorage.LOCATION,
        JSON.stringify({
          latitude: latitude,
          longitude: longitude
        })
      )
    })
  }, [])

  return (
    <div className="maps mt-[-24px] relative">
      <div className="relative w-full rounded h-600-px">
        <div className="rounded h-full">
          <ReactMapGL
            {...viewport}
            onViewportChange={setViewport}
            goongApiAccessToken={GOONG_MAPTILES_KEY}
          >
            {showItem && geojson && (
              <Source type="geojson" data={geojson}>
                <Layer {...layerStyle} />
              </Source>
            )}

            {data &&
              data.map(
                (item, index) =>
                  item.location && (
                    <Marker
                      longitude={item.location.lng}
                      latitude={item.location.lat}
                      key={index}
                    >
                      <div
                        className="location cursor-pointer"
                        onClick={() =>
                          handleOpenItem({
                            id: item._id,
                            name: item.name,
                            image: item.images[0],
                            address: item.detail_address,
                            longitude: item.location.lng,
                            latitude: item.location.lat,
                            facebook: item.facebook,
                            instagram: item.instagram
                          })
                        }
                      >
                        <div className="text-2xl text-red-500">
                          <i className="bx bxs-map"></i>
                        </div>
                        <span className="location-name text-sm text-grey-5">
                          {item.name}
                        </span>
                      </div>
                    </Marker>
                  )
              )}

            <GeolocateControl
              style={geolocateStyle}
              positionOptions={positionOptions}
              trackUserLocation
              auto
            />
          </ReactMapGL>

          {showItem && (
            <MapItem
              id={dataItem.id}
              name={dataItem.name}
              image={dataItem.image}
              address={dataItem.address}
              lat={dataItem.latitude}
              lng={dataItem.longitude}
              facebook={dataItem.facebook}
              instagram={dataItem.instagram}
              handleClickDirection={handleClickDirection}
              handleCancel={handleClickCancelItem}
            />
          )}
        </div>
      </div>
    </div>
  )
}
