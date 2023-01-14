import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/userReducer'
import { TextField, Button } from '@mui/material'
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
            <TextField
              label="username"
              type="text"
              id="username"
              name="username"
            />
          </div>
          <div>
            <TextField
              label="password"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <Button type="submit" variant="contained" id="login-button">
            login
          </Button>
        </form>
      </div>
    )
  }
}
export default LoginForm
