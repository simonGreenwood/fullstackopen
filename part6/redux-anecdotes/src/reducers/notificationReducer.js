import { createSlice } from '@reduxjs/toolkit'
const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})
export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (notification, timeout) => {
  return async dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}
export default notificationSlice.reducer