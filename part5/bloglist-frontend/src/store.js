import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
const combinedReducers = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
})

const store = configureStore({
  reducer: combinedReducers,
})
export default store
