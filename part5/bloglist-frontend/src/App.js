import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'

import { Route, Routes } from 'react-router-dom'
const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [success, setSuccess] = useState(null)

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        setErrorMessage={setErrorMessage}
        setSuccess={setSuccess}
        blogs={blogs}
        blogFormRef={blogFormRef}
      />
    </Togglable>
  )

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(setNotification(`logged in as ${user.username}`))
      blogService.setToken(user.token)
    } catch (exception) {
      console.log('wrong credentials')
      dispatch(setNotification('wrong credentials'))
    }
  }

  useEffect(() => {
    dispatch(initializeBlogs())
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
  return (
    <div>
      {user === null ? <LoginForm /> : null}
      <h2>blogs</h2>
      <div>
        logged in as {user.username}
        <button onClick={() => handleLogout()}>logout</button>
      </div>
      {blogForm()}
      <Notification message={errorMessage} success={success} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
