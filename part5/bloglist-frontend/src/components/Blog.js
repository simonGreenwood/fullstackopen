import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog}) => {
  const [likes,setLikes] = useState(blog.likes)
  const [extended, setExtended] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = async () => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    const response = await blogService.updateBlog(blog.id, updatedBlog)
    blog = response
    setLikes(likes+1)
  }
  const handleView = () => {
    setExtended(!extended)
  }
  return (
    <div style={blogStyle}>
      <div>{blog.title} <button onClick={() => handleView()}>{extended ? "hide" : "view"}</button></div>
      {extended ? 
        <div>
          <div>{blog.url}</div>
          <div>likes: {likes} <button onClick={() => handleLike()}>like</button></div>
          <div>{blog.author}</div>
        </div> 
      : null}
    </div> 
  )
}

export default Blog