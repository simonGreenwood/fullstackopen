import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const [extended, setExtended] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleView = () => {
    setExtended(!extended)
  }

  const handleLike = () => {
    dispatch(setNotification(`You liked ${blog.title}`, 5))
    dispatch(likeBlog(blog))
  }

  const handleDelete = () => {
    dispatch(setNotification(`You deleted ${blog.title}`, 5))
    dispatch(removeBlog(blog))
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button className="view-button" onClick={() => handleView()}>
          {extended ? 'hide' : 'view'}
        </button>
      </div>
      {extended ? (
        <div>
          <div className="url">{blog.url}</div>
          <div className="likes">
            likes: {blog.likes}
            <button onClick={handleLike} className="like-button">
              like
            </button>
          </div>
          {blog.user.id === user.id ? (
            <button onClick={handleDelete}>remove</button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default Blog
