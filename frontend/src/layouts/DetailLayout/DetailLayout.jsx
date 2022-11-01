import React from 'react'
import HeaderDetail from 'src/page-components/Header/HeaderDetail'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
export default function DetailLayout() {
  return (
    <div className="relative">
      <HeaderDetail />
      <Outlet />
    </div>
  )
}

DetailLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}
