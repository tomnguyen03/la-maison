import React, { useEffect, useState } from 'react'
import ReactMapGL, {
  GeolocateControl,
  Source,
  Layer,
  Marker
} from '@goongmaps/goong-map-react'
import polyliline from '@mapbox/polyline'
import gmsDirections from '@goongmaps/goong-sdk/services/directions'
import {
  GOONG_API_KEY,
  GOONG_MAPTILES_KEY
} from '../../../constants/variables'

export default function MapDistance({
  hiddenModal,
  myLocation,
  destination
}) {
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
    zoom: 10,
    bearing: 0,
    pitch: 0
  })

  useEffect(() => {
    const base = gmsDirections({
      accessToken: GOONG_API_KEY
    })

    const origin = `${myLocation.latitude},${myLocation.longitude}`
    const destinate = `${destination.lat},${destination.lng}`

    base
      .getDirections({
        origin: origin,
        destination: destinate,
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
  }, [myLocation, destination])

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

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto text-grey-3">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={hiddenModal}
      ></div>
      <div className="flex items-center min-h-screen p-3">
        <div className="container flex relative w-full h-[600px] mx-auto bg-white rounded-lg shadow-lg">
          <ReactMapGL
            {...viewport}
            onViewportChange={setViewport}
            goongApiAccessToken={GOONG_MAPTILES_KEY}
          >
            {geojson && (
              <Source type="geojson" data={geojson}>
                <Layer {...layerStyle} />
              </Source>
            )}

            <Marker
              longitude={destination.lng}
              latitude={destination.lat}
            >
              <div className="text-2xl text-red-dd cursor-pointer">
                <i className="bx bxs-map"></i>
              </div>
            </Marker>

            <GeolocateControl
              style={geolocateStyle}
              positionOptions={positionOptions}
              trackUserLocation
              auto
            />
          </ReactMapGL>
        </div>
      </div>
    </div>
  )
}
