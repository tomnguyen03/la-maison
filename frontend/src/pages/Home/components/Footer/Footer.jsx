import React from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'

export default function Footer() {
  return (
    <>
      <div className="container mx-auto contact text-6xl text-right italic mb-10">
        contact<br></br>@lamaison.vn
      </div>
      <div className="border-t-2 border-grey-d9 p-[25px] flex items-center justify-between">
        <p className="uppercase text-sm font-medium flex items-center gap-2">
          <i className="bx bxl-instagram text-xl"></i>
          follow us on instagram
        </p>
        <Link
          to={path.suggestAPlace}
          className="uppercase text-sm font-medium"
        >
          suggest a place
        </Link>
        <p className="uppercase text-sm font-medium flex items-center gap-2">
          <i className="bx bx-heart"></i>
          from danang with love
        </p>
      </div>
    </>
  )
}
