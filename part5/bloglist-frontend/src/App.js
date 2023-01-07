import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
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

  /*const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const statusCode = await blogService.deleteBlog(blog.id)
      if (statusCode !== 204) {
        console.log('error deleting blog')
        return
      }
    }
  }
  const handleLike = async (blog) => {
    const newBlog = await blogService.updateBlog(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    })
    return newBlog
  }*/
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
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} success={success} />
        <form onSubmit={(event) => handleLogin(event)}>
          <div>
            username
            <input
              type="text"
              value={username}
              id="username"
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              id="password"
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
        </form>
      </div>
    )
  }
  if (blogs === []) return <h1>Loading.......</h1>
  return (
    <div>
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
