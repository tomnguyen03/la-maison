import React from 'react'

// src/components

import CardLineChart from 'src/components/Cards/CardLineChart'
import CardPageVisits from 'src/components/Cards/CardPageVisits'

export default function Home() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
      </div>
    </>
  )
}
