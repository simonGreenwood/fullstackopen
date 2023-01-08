import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/userReducer'

import Notification from './Notification'
const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(event.target.username.value, event.target.password.value))
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={(event) => handleLogin(event)}>
          <div>
            username
            <input type="text" id="username" name="username" />
          </div>
          <div>
            password
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
        </form>
      </div>
    )
  }
}
export default LoginForm
