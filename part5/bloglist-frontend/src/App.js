import { useState, useEffect } from 'react'

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

  const handleLogout = () => {
    console.log("logging out")
    window.localStorage.removeItem('loggedBlogappUser')
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
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
      },5000)
    }
  }
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
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
        <Notification message={errorMessage} success={success}/>
        <form onSubmit={(event) => handleLogin(event)}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      
      <div>
        {user.name} logged in <button onClick={() => handleLogout()}>logout</button>
      </div>
      <Notification message={errorMessage} success={success} /> 
      <Togglable buttonLabel="new blog">
        <BlogForm setErrorMessage={setErrorMessage} setSuccess={setSuccess} setBlogs={setBlogs} blogs={blogs}/>
      </Togglable>
      {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
        <Blog key={blog.id} startingBlog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
      )}
    </div>
  )
}
 
export default App
