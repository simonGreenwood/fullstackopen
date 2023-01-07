import { useEffect } from 'react'

import LoginForm from './components/LoginForm'

import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import { Route, Routes } from 'react-router-dom'

import Users from './components/Users'
import Home from './components/Home'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedBlogappUser')
  }

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userAsJson = JSON.parse(loggedUserJSON)
      dispatch(setUser(userAsJson))
      blogService.setToken(userAsJson.token)
    }
  }, [])

  if (user === null) {
    return <LoginForm />
  }
  if (blogs === []) return <h1>Loading...</h1>
  if (user === null) return <LoginForm />
  return (
    <div>
      <h2>blogs</h2>
      <div>
        logged in as {user.username}
        <button onClick={() => handleLogout()}>logout</button>
      </div>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
