import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

import loginService from '../services/login'
import blogService from '../services/blogs'

import Notification from './Notification'
const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(setNotification(`logged in as ${user.username}`))
      blogService.setToken(user.token)
    } catch (exception) {
      console.log(username, password)
      console.log(exception)
      console.log('wrong credentials')
      dispatch(setNotification('wrong credentials'))
    }
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
