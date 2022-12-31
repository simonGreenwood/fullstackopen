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

let timeoutId = null
export const setNotificationWithTimeout = (notification, timeout) => {
  return async dispatch => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(setNotification(notification))
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout*1000)
  }
}
export default notificationSlice.reducer