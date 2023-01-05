import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'notification',
  reducers: {
    setNotificationMessage: (state) => {
      const content = 'new'
      state = content
    },
    clearNotification: (state) => {
      state = 'notification'
      return state
    },
  },
})
export const { setNotificationMessage, clearNotification } =
  notificationSlice.actions

export const setNotification = (notification) => {
  return async (dispatch) => {
    console.log(notification)
    dispatch(setNotificationMessage(notification))
  }
}
export default notificationSlice.reducer
