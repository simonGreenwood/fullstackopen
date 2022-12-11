import { useState} from "react"
import blogService from "../services/blogs"

const Blog = ({startingBlog,blogs,setBlogs,user}) => {
  const [blog,setBlog] = useState(startingBlog)
  const [extended, setExtended] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = async () => {
    const newBlog = await blogService.updateBlog(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    })
    setBlog(newBlog)
    setBlogs(blogs.map(b => b.id===newBlog.id ? newBlog: b))
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
          <div>likes: {blog.likes} <button onClick={() => handleLike()}>like</button></div>
          <div>{blog.author}</div>
        </div> 
      : null}
    </div> 
  )
}

export default Blog