import React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../pages/Login/auth.slice'
import { useNavigate } from 'react-router-dom'
import { path } from '../../constants/path'

const UserDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // dropdown props
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleLogout = async () => {
    dispatch(logout())

    navigate(path.login)
  }

  const avatar = useSelector(state => state.auth.profile.avatar)

  return (
    <>
      <div
        className="items-center flex cursor-pointer"
        onClick={handleClick}
      >
        <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
          <img
            alt="..."
            className="w-full h-full rounded-full bg-center bg-no-repeat bg-cover object-cover shadow-lg"
            src={
              avatar ||
              'https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png'
            }
          />
        </span>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Typography
          sx={{ p: 2 }}
          style={{ cursor: 'pointer' }}
          onClick={handleLogout}
        >
          Logout
        </Typography>
      </Popover>
    </>
  )
}

export default UserDropdown
