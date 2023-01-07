import { useRef } from 'react'
import Notification from './Notification'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'
const Home = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <Notification />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
export default Home
