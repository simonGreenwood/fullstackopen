import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)
  console.log(message)
  return <div>{message}</div>
}

export default Notification
