import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'notification',
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

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    console.log(notification)
    dispatch(setNotificationMessage(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}
export default notificationSlice.reducer
