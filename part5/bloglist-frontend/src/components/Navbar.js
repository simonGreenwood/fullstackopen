import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Button, Typography } from '@mui/material'
const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.name)
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" />
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
        <Typography color="inherit">{user} logged in</Typography>
      </Toolbar>
    </AppBar>
  )
}
export default Navbar
