import React from 'react'
import SettingUser from './SettingUser/SettingUser'
import Collection from './Collection/Collection'
import { Helmet } from 'react-helmet-async'

export default function User() {
  return (
    <>
      <Helmet>
        <title>Trang cá nhân</title>
      </Helmet>
      <SettingUser />
      <Collection />
    </>
  )
}
