import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'
const Notification = () => {
  const message = useSelector((state) => state.notification)
  return message ? <Alert severity="success">{message}</Alert> : null
}

export default Notification
