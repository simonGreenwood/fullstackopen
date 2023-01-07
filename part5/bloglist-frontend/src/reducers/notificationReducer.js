import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationMessage: (state, action) => {
      return action.payload
    },
    clearNotification: () => {
      return ''
    },
  },
})
export const { setNotificationMessage, clearNotification } =
  notificationSlice.actions
let timeoutId = null
export const setNotification = (notification, time) => {
  return async (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    console.log(notification)
    dispatch(setNotificationMessage(notification))
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}
export default notificationSlice.reducer
