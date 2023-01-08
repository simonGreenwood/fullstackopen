import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/userReducer'

import Notification from './Notification'
const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={(event) => handleLogin(event)}>
          <div>
            username
            <input
              type="text"
              value={username}
              id="username"
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              id="password"
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
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
