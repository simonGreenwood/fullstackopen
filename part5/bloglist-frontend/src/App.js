import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
        setBlogs={setBlogs}
        blogs={blogs}
        blogFormRef={blogFormRef}
      />
    </Togglable>
  )

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const statusCode = await blogService.deleteBlog(blog.id)
      if (statusCode !== 204) {
        console.log('error deleting blog')
        return
      }
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    }
  }
  const handleLike = async (blog) => {
    const newBlog = await blogService.updateBlog(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    })
    setBlogs(blogs.map((b) => (b.id === newBlog.id ? newBlog : b)))
    return newBlog
  }
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
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      setErrorMessage('wrong credentials')
      setSuccess(false)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
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

  return (
    <div>
      <h2>blogs</h2>
      <div>
        logged in as {user.username}
        <button onClick={() => handleLogout()}>logout</button>
      </div>
      {blogForm()}
      <Notification message={errorMessage} success={success} />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            startingBlog={blog}
            handleDelete={(blog) => handleDelete(blog)}
            handleLike={(blog) => handleLike(blog)}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
