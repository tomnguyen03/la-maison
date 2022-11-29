/*eslint-disable*/
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import NotificationDropdown from 'src/components/Dropdowns/NotificationDropdown.jsx'
import UserDropdown from 'src/components/Dropdowns/UserDropdown'
import './sidebar.css'

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState('hidden')

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap uppercase font-bold p-4 px-0 text-2xl"
            to="/"
          >
            La Maison
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-2 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap uppercase font-bold p-4 px-0 text-2xl"
                    to="/"
                  >
                    La Maison
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <NavLink
                  className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500 "
                  to="/dashboard"
                >
                  <i className="fas fa-tv mr-2 text-sm opacity-75"></i>{' '}
                  Dashboard
                </NavLink>
              </li>

              <li className="items-center">
                <NavLink
                  className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500 "
                  to="/users"
                >
                  <i className="fa-solid fa-users mr-2 text-sm opacity-75"></i>{' '}
                  Users
                </NavLink>
              </li>

              <li className="items-center">
                <NavLink
                  className="text-xs uppercase py-3 font-bold block  text-blueGray-700 hover:text-blueGray-500"
                  to="/tables"
                >
                  <i className="fa-solid fa-store mr-2 text-sm opacity-75"></i>{' '}
                  Café
                </NavLink>
              </li>

              <li className="items-center">
                <NavLink
                  className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500 "
                  to="/admin/maps"
                >
                  <i className="fas fa-map-marked mr-2 text-sm opacity-75"></i>{' '}
                  Maps
                </NavLink>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              STAFF
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                  to="/auth/login"
                >
                  <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm opacity-75"></i>{' '}
                  Suggest list
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                  to="/auth/login"
                >
                  <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm opacity-75"></i>{' '}
                  Create cafe
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
          </div>
        </div>
      </nav>
    </>
  )
}
