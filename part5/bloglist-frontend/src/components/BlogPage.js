import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { likeBlog, commentOnBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
const BlogPage = () => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)
  const dispatch = useDispatch()
  const handleLike = () => {
    dispatch(setNotification(`You liked ${blog.title}`, 5))
    dispatch(likeBlog(blog))
  }
  const [comment, setComment] = useState('')
  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentOnBlog(blog, comment))
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
        <h3>comments</h3>
        <form onSubmit={(e) => handleComment(e)}>
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default BlogPage
