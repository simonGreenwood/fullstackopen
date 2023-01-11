import { useRef } from 'react'
import Notification from './Notification'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'
import { TableContainer, Paper, Table, TableBody } from '@material-ui/core'
const Home = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <Notification />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default Home
