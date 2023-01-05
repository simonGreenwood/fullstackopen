import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
const combinedReducers = combineReducers({
  notification: notificationReducer,
})

const store = configureStore({
  reducer: combinedReducers,
})
export default store
