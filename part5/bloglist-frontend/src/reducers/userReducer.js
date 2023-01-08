import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      console.log(exception)
      console.log('wrong credentials')
      dispatch(setNotification('wrong credentials', 5))
    }
  }
}
export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    dispatch(setUser(null))
    dispatch(setNotification('logged out', 5))
  }
}
export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export default userSlice.reducer
