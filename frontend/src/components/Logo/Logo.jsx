import React from 'react'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'

export default function Logo() {
  const navigate = useNavigate()

  const handleClickLogo = () => {
    navigate(path.home)
  }

  return (
    <div
      className="text-2xl cursor-pointer"
      onClick={handleClickLogo}
    >
      La
      <br />
      Maison
    </div>
  )
}
