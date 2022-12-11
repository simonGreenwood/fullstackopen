import Togglable from "./Togglable"
import { useState } from "react"

const Blog = ({blog}) => {
  const [extended, setExtended] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = () => {
    console.log('like')
  }
  const handleView = () => {
    setExtended(!extended)
  }
  return (
    <div style={blogStyle}>
      <div>{blog.title} <button onClick={() => handleView()}>{extended ? "view" : "hide"}</button></div>
      {extended ? 
        <div>
          <div>{blog.url}</div>
          <div>likes: {blog.likes} <button onClick={() => handleLike()}>like</button></div>
          <div>{blog.author}</div>
        </div> 
      : null}
    </div>  
  )
}

export default Blog