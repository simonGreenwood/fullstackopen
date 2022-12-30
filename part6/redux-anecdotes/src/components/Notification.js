import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? "" : "none"
  }
  return (
      <div style={style}>
        {notification}
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
export default connect(
  mapStateToProps
)(Notification)
