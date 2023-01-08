import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const handleLogout = () => {
    dispatch(logout())
  }

  const navbarStyle = {
    padding: 5,
    background: 'lightgray',
  }
  const navElementStyle = {
    paddingRight: 5,
  }

  return (
    <div style={navbarStyle} className="navbar">
      <Link to="/" style={navElementStyle}>
        blogs
      </Link>
      <Link to="/users" style={navElementStyle}>
        users
      </Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}
export default Navbar
