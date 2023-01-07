import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const combinedReducers = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
})

const store = configureStore({
  reducer: combinedReducers,
})
export default store
