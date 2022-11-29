import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// components

import CardStats from 'src/components/Cards/CardStats.jsx'
import { formatThousand } from '../../utils/helper'
import {
  getAllCafe,
  statisticalUser,
  getCount
} from './statistical.slice'

export default function HeaderStats() {
  const dispatch = useDispatch()
  const [totalCount, setTotalCount] = useState(0)
  const [totalUser, setTotalUser] = useState(0)
  const [totalCafe, setTotalCafe] = useState(0)

  useEffect(() => {
    dispatch(getCount())
      .then(unwrapResult)
      .then(res => setTotalCount(res.totalCount))
  }, [dispatch])

  useEffect(() => {
    dispatch(statisticalUser())
      .then(unwrapResult)
      .then(res => setTotalUser(res.totalUser))
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllCafe())
      .then(unwrapResult)
      .then(res => setTotalCafe(res.data.length))
  }, [dispatch])

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="TRAFFIC"
                  statTitle={formatThousand(totalCount)}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="USERS"
                  statTitle={formatThousand(totalUser)}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-users"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="CAFES"
                  statTitle={formatThousand(totalCafe)}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-pink-500"
                />
              </div>
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
