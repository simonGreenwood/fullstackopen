import { useState } from 'react'
const Blog = (props) => {
  const [blog, setBlog] = useState(props.startingBlog)
  const [extended, setExtended] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleView = () => {
    setExtended(!extended)
  }
  return (
    <div style={blogStyle} className="blog">
      <div>{blog.title} {blog.author} <button className="view-button" onClick={() => handleView()}>{extended ? 'hide' : 'view'}</button></div>
      {extended ?
        <div>
          <div className='url'>{blog.url}</div>
          <div className='likes'>likes: {blog.likes} <button onClick={async () => setBlog(await props.handleLike(blog) || blog)} className="like-button">like</button></div>
          {blog.user.id===props.user.id ? <button onClick={() => props.handleDelete(blog)}>remove</button> : null}
        </div>
        : null}
    </div>
  )
}

export default Blog