import React from 'react'
import bgAvatar from 'src/assets/img/team-1-800x800.jpg'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
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

  return (
    <>
      <div
        className="items-center flex cursor-pointer"
        onClick={handleClick}
      >
        <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
          <img
            alt="..."
            className="w-full rounded-full align-middle border-none shadow-lg"
            src={bgAvatar}
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
