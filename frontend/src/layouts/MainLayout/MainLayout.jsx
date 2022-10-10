import React from 'react'
import Header from 'src/page-components/Header/Header'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}
