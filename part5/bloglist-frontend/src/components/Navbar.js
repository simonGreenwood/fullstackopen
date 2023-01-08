import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  const user = useSelector((state) => state.user)
  return (
    <div className="navbar">
      <h1>Bloglist</h1>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}
export default Navbar
