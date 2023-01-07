import { useSelector } from 'react-redux'
import Blog from './Blog'
const BlogsList = () => {
  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} startingBlog={blog} />
      ))}
    </div>
  )
}
export default BlogsList
