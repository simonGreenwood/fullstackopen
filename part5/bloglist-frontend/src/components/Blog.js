import { useState } from 'react'
const Blog = (props) => {
  const [blog,setBlog] = useState(props.startingBlog)
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
      <div>{blog.title} {blog.author} <button onClick={() => handleView()}>{extended ? 'hide' : 'view'}</button></div>
      {extended ?
        <div>
          <div>{blog.url}</div>
          <div>likes: {blog.likes} <button onClick={async () => setBlog(await props.handleLike(blog))}>like</button></div>
          <div>{blog.author}</div>
          {blog.user.id===props.user.id ? <button onClick={() => props.handleDelete(blog)}>remove</button> : null}
        </div>
        : null}
    </div>
  )
}

export default Blog