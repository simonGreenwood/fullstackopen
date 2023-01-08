import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { likeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
const BlogPage = () => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)
  console.log(blogs, blog)
  const dispatch = useDispatch()
  const handleLike = () => {
    dispatch(setNotification(`You liked ${blog.title}`, 5))
    dispatch(likeBlog(blog))
  }
  if (!blog) return null
  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          <button onClick={handleLike}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>
    </div>
  )
}
export default BlogPage
