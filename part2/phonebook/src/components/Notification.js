const Notification = ({message,error}) => {
  if (message!==null ) {
    if (error) {
      return <h1 className="notification error">{message}</h1>
    } else {
      return <h1 className="notification success">{message}</h1>
    }
  }
  return null
}
export default Notification  
   